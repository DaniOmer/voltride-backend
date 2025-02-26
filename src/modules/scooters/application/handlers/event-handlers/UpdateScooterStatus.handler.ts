import {
  FaultReportedEvent,
  FaultResolvedEvent,
  FaultSeverity,
  IFaultRepository,
  IScooterRepository,
  ScooterStatus,
} from "../../../domain";
import {
  IEventStore,
  IDomainEvent,
} from "../../../../../shared/domain/events/events.interface";

export class UpdateScooterStatusHandler {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly scooterRepository: IScooterRepository,
    private readonly faultRepository: IFaultRepository
  ) {
    this.registerEvents();
  }

  private registerEvents(): void {
    this.eventStore.subscribe(
      "FaultReportedEvent",
      this.handleFaultReportedEvent.bind(this)
    );
    this.eventStore.subscribe(
      "FaultResolvedEvent",
      this.handleFaultResolvedEvent.bind(this)
    );
  }

  private handleFaultReportedEvent(event: IDomainEvent<any>): void {
    // Cast the event to FaultReportedEvent
    const faultReportedEvent = event as FaultReportedEvent;
    this.processFaultReportedEvent(faultReportedEvent).catch((error) => {
      console.error("Error processing fault reported event:", error);
    });
  }

  private handleFaultResolvedEvent(event: IDomainEvent<any>): void {
    // Cast the event to FaultResolvedEvent
    const faultResolvedEvent = event as FaultResolvedEvent;
    this.processFaultResolvedEvent(faultResolvedEvent).catch((error) => {
      console.error("Error processing fault resolved event:", error);
    });
  }

  private async processFaultReportedEvent(
    event: FaultReportedEvent
  ): Promise<void> {
    try {
      const { scooterId, severity } = event.payload;

      // Only update scooter status for critical faults
      if (severity === FaultSeverity.CRITICAL) {
        const scooter = await this.scooterRepository.findById(scooterId);
        if (!scooter) {
          console.error(`Scooter with ID ${scooterId} not found`);
          return;
        }

        // Update scooter status to REPAIR
        scooter.updateStatus(ScooterStatus.REPAIR);
        await this.scooterRepository.update(scooter);

        console.log(
          `Scooter ${scooter.serialNumber} status updated to REPAIR due to critical fault`
        );
      }
    } catch (error) {
      console.error("Failed to update scooter status:", error);
    }
  }

  private async processFaultResolvedEvent(
    event: FaultResolvedEvent
  ): Promise<void> {
    try {
      const { scooterId, severity } = event.payload;

      // Only check for status update if it was a critical fault
      if (severity === FaultSeverity.CRITICAL) {
        const scooter = await this.scooterRepository.findById(scooterId);
        if (!scooter) {
          console.error(`Scooter with ID ${scooterId} not found`);
          return;
        }

        // Check if there are any other unresolved critical faults for this scooter
        const unresolvedFaults = await this.faultRepository.findByScooterId(
          scooterId
        );
        const hasUnresolvedCriticalFaults = unresolvedFaults.some(
          (f) =>
            f.severity === FaultSeverity.CRITICAL && f.status !== "resolved"
        );

        // If no other critical faults, update scooter status to AVAILABLE
        if (
          !hasUnresolvedCriticalFaults &&
          scooter.status === ScooterStatus.REPAIR
        ) {
          scooter.updateStatus(ScooterStatus.AVAILABLE);
          await this.scooterRepository.update(scooter);

          console.log(
            `Scooter ${scooter.serialNumber} status updated to AVAILABLE after resolving critical fault`
          );
        }
      }
    } catch (error) {
      console.error("Failed to update scooter status:", error);
    }
  }
}
