import { IEventStore } from "../../../../../shared/domain";
import {
  ResolveFaultCommand,
  IFaultRepository,
  IScooterRepository,
} from "../../../domain";
import { FaultTrackingService } from "../../services/fault-tracking.service";
import { MaintenanceNotificationService } from "../../services/maintenance-notification.service";

export class ResolveFaultHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly faultRepository: IFaultRepository,
    private readonly faultTrackingService: FaultTrackingService,
    private readonly maintenanceNotificationService: MaintenanceNotificationService,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: ResolveFaultCommand
  ): Promise<{ success: boolean; message: string; faultId?: number }> {
    try {
      const {
        faultId,
        faultUid,
        resolutionDate,
        repairNotes,
        cost,
        warrantyStatus,
        warrantyNotes,
      } = command.payload;

      // Validate fault exists
      let fault;
      if (faultId) {
        fault = await this.faultRepository.findById(faultId);
      } else if (faultUid) {
        fault = await this.faultRepository.findByUid(faultUid);
      } else {
        return {
          success: false,
          message: "Either faultId or faultUid must be provided",
        };
      }

      if (!fault) {
        return {
          success: false,
          message: `Fault with ID ${faultId || faultUid} not found`,
        };
      }

      // Update warranty status if provided
      if (warrantyStatus) {
        await this.faultTrackingService.updateWarrantyStatus(
          fault.id!,
          warrantyStatus,
          warrantyNotes
        );
      }

      // Resolve the fault
      const resolvedFault = await this.faultTrackingService.resolveFault(
        fault.id!,
        resolutionDate,
        repairNotes,
        cost
      );

      if (!resolvedFault) {
        return {
          success: false,
          message: `Failed to resolve fault with ID ${fault.id}`,
        };
      }

      // Get the scooter details
      const scooter = await this.scooterRepository.findById(
        resolvedFault.scooterId
      );
      if (!scooter) {
        return {
          success: true,
          message: "Fault resolved successfully, but scooter details not found",
          faultId: resolvedFault.id,
        };
      }

      // Send notification to managers
      // In a real application, you would get the manager emails from a configuration or user service
      const managerEmails = ["manager@voltride.com", "support@voltride.com"];
      await this.maintenanceNotificationService.sendFaultResolvedNotification(
        managerEmails,
        scooter.serialNumber,
        scooter.modelName,
        resolvedFault.title,
        resolvedFault.resolutionDate!,
        resolvedFault.downtime!,
        resolvedFault.cost || 0
      );

      return {
        success: true,
        message: "Fault resolved successfully",
        faultId: resolvedFault.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to resolve fault: ${error.message}`,
      };
    }
  }
}
