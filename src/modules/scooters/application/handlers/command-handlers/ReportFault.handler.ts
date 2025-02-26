import { IEventStore } from "../../../../../shared/domain";
import { ReportFaultCommand, IScooterRepository } from "../../../domain";
import { FaultTrackingService } from "../../services/fault-tracking.service";
import { MaintenanceNotificationService } from "../../services/maintenance-notification.service";

export class ReportFaultHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly faultTrackingService: FaultTrackingService,
    private readonly maintenanceNotificationService: MaintenanceNotificationService,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: ReportFaultCommand
  ): Promise<{ success: boolean; message: string; faultId?: number }> {
    try {
      const {
        scooterId,
        scooterUid,
        title,
        description,
        reportedBy,
        reportedDate,
        severity,
        isWarrantyClaim,
      } = command.payload;

      // Validate scooter exists
      const scooter = await this.scooterRepository.findById(scooterId);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${scooterId} not found`,
        };
      }

      // Report the fault
      const fault = await this.faultTrackingService.reportFault(
        scooterId,
        scooterUid,
        title,
        description,
        reportedBy,
        reportedDate,
        severity,
        isWarrantyClaim
      );

      // Send notification to managers
      // In a real application, you would get the manager emails from a configuration or user service
      const managerEmails = ["manager@voltride.com", "support@voltride.com"];
      await this.maintenanceNotificationService.sendFaultReportedNotification(
        managerEmails,
        scooter.serialNumber,
        scooter.modelName,
        fault.title,
        fault.reportedBy,
        fault.reportedDate,
        fault.severity,
        fault.isWarrantyClaim
      );

      return {
        success: true,
        message: "Fault reported successfully",
        faultId: fault.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to report fault: ${error.message}`,
      };
    }
  }
}
