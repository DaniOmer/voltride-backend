import { v4 as uuidv4 } from "uuid";
import {
  IFaultRepository,
  IScooterRepository,
  Fault,
  FaultSeverity,
  FaultStatus,
  WarrantyStatus,
  FaultReportedEvent,
  FaultResolvedEvent,
  ScooterStatus,
} from "../../domain";
import { IEventStore } from "../../../../shared/domain/events/events.interface";

export class FaultTrackingService {
  constructor(
    private readonly faultRepository: IFaultRepository,
    private readonly scooterRepository: IScooterRepository,
    private readonly eventStore: IEventStore
  ) {}

  async reportFault(
    scooterId: number,
    scooterUid: string,
    title: string,
    description: string,
    reportedBy: string,
    reportedDate: Date,
    severity: FaultSeverity,
    isWarrantyClaim: boolean
  ): Promise<Fault> {
    // Get the scooter details
    const scooter = await this.scooterRepository.findById(scooterId);
    if (!scooter) {
      throw new Error(`Scooter with ID ${scooterId} not found`);
    }

    // Create a new fault
    const fault = new Fault({
      uid: uuidv4(),
      scooterId,
      scooterUid,
      title,
      description,
      reportedBy,
      reportedDate,
      severity,
      status: FaultStatus.REPORTED,
      isWarrantyClaim,
      warrantyStatus: isWarrantyClaim
        ? WarrantyStatus.PENDING
        : WarrantyStatus.NOT_APPLICABLE,
    });

    // Save the fault
    await this.faultRepository.create(fault);

    // Update scooter status if the fault is critical
    if (severity === FaultSeverity.CRITICAL) {
      scooter.updateStatus(ScooterStatus.REPAIR);
      await this.scooterRepository.update(scooter);
    }

    // Publish a fault reported event
    const faultReportedEvent = new FaultReportedEvent({
      faultId: fault.id!,
      faultUid: fault.uid,
      scooterId: fault.scooterId,
      scooterUid: fault.scooterUid,
      scooterSerialNumber: scooter.serialNumber,
      scooterModelId: scooter.modelId,
      scooterModelUid: scooter.modelUid,
      scooterModelName: scooter.modelName,
      title: fault.title,
      description: fault.description,
      reportedBy: fault.reportedBy,
      reportedDate: fault.reportedDate,
      severity: fault.severity,
      isWarrantyClaim: fault.isWarrantyClaim,
    });

    this.eventStore.publish(faultReportedEvent);

    return fault;
  }

  async updateFaultStatus(
    faultId: number,
    status: FaultStatus,
    notes?: string
  ): Promise<Fault | null> {
    // Find the fault
    const fault = await this.faultRepository.findById(faultId);
    if (!fault) {
      return null;
    }

    // Update the fault status
    fault.updateStatus(status);

    // Add notes if provided
    if (notes) {
      if (status === FaultStatus.DIAGNOSED) {
        fault.addDiagnosisNotes(notes);
      } else if (status === FaultStatus.UNRESOLVED) {
        fault.markUnresolved(notes);
      }
    }

    // Save the updated fault
    await this.faultRepository.update(fault);

    return fault;
  }

  async updateWarrantyStatus(
    faultId: number,
    warrantyStatus: WarrantyStatus,
    notes?: string
  ): Promise<Fault | null> {
    // Find the fault
    const fault = await this.faultRepository.findById(faultId);
    if (!fault) {
      return null;
    }

    // Update the warranty status
    fault.updateWarrantyStatus(warrantyStatus, notes);

    // Save the updated fault
    await this.faultRepository.update(fault);

    return fault;
  }

  async resolveFault(
    faultId: number,
    resolutionDate: Date,
    repairNotes: string,
    cost?: number
  ): Promise<Fault | null> {
    // Find the fault
    const fault = await this.faultRepository.findById(faultId);
    if (!fault) {
      return null;
    }

    // Get the scooter details
    const scooter = await this.scooterRepository.findById(fault.scooterId);
    if (!scooter) {
      throw new Error(`Scooter with ID ${fault.scooterId} not found`);
    }

    // Resolve the fault
    fault.resolveIssue(resolutionDate, repairNotes, cost);

    // Save the updated fault
    await this.faultRepository.update(fault);

    // Update scooter status if it was in repair
    if (scooter.status === ScooterStatus.REPAIR) {
      // Check if there are any other unresolved critical faults
      const unresolvedFaults = await this.faultRepository.findByScooterId(
        scooter.id!
      );
      const hasUnresolvedCriticalFaults = unresolvedFaults.some(
        (f) =>
          f.id !== fault.id &&
          f.severity === FaultSeverity.CRITICAL &&
          f.status !== FaultStatus.RESOLVED
      );

      if (!hasUnresolvedCriticalFaults) {
        scooter.updateStatus(ScooterStatus.AVAILABLE);
        await this.scooterRepository.update(scooter);
      }
    }

    // Publish a fault resolved event
    const faultResolvedEvent = new FaultResolvedEvent({
      faultId: fault.id!,
      faultUid: fault.uid,
      scooterId: fault.scooterId,
      scooterUid: fault.scooterUid,
      scooterSerialNumber: scooter.serialNumber,
      scooterModelId: scooter.modelId,
      scooterModelUid: scooter.modelUid,
      scooterModelName: scooter.modelName,
      title: fault.title,
      reportedDate: fault.reportedDate,
      resolutionDate: fault.resolutionDate!,
      downtime: fault.downtime!,
      severity: fault.severity,
      repairNotes: fault.repairNotes!,
      isWarrantyClaim: fault.isWarrantyClaim,
      warrantyStatus: fault.warrantyStatus,
      cost: fault.cost || 0,
    });

    this.eventStore.publish(faultResolvedEvent);

    return fault;
  }

  async getFaultsByScooter(scooterId: number): Promise<Fault[]> {
    return this.faultRepository.findByScooterId(scooterId);
  }

  async getUnresolvedFaults(): Promise<Fault[]> {
    return this.faultRepository.findUnresolvedFaults();
  }

  async getWarrantyClaims(status?: WarrantyStatus): Promise<Fault[]> {
    return this.faultRepository.findWarrantyClaims(status);
  }

  async getFaultsByDateRange(startDate: Date, endDate: Date): Promise<Fault[]> {
    return this.faultRepository.findByDateRange(startDate, endDate);
  }

  async getFaultsByDowntimeRange(
    minHours: number,
    maxHours: number
  ): Promise<Fault[]> {
    return this.faultRepository.findByDowntimeRange(minHours, maxHours);
  }

  async getFaultsBySeverity(severity: FaultSeverity): Promise<Fault[]> {
    return this.faultRepository.findBySeverity(severity);
  }
}
