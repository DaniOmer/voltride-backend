import { FaultReportedEvent } from "../../../domain";
import { MaintenanceNotificationService } from "../../services/maintenance-notification.service";
import {
  IEventStore,
  IDomainEvent,
} from "../../../../../shared/domain/events/events.interface";

export class NotifyFaultReportedHandler {
  constructor(
    private readonly maintenanceNotificationService: MaintenanceNotificationService,
    private readonly eventStore: IEventStore
  ) {
    this.registerEvents();
  }

  private registerEvents(): void {
    this.eventStore.subscribe(
      "FaultReportedEvent",
      this.handleFaultReportedEvent.bind(this)
    );
  }

  private handleFaultReportedEvent(event: IDomainEvent<any>): void {
    // Cast the event to FaultReportedEvent
    const faultReportedEvent = event as FaultReportedEvent;
    this.processFaultReportedEvent(faultReportedEvent).catch((error) => {
      console.error("Error processing fault reported event:", error);
    });
  }

  private async processFaultReportedEvent(
    event: FaultReportedEvent
  ): Promise<void> {
    try {
      const {
        scooterSerialNumber,
        scooterModelName,
        title,
        reportedBy,
        reportedDate,
        severity,
        isWarrantyClaim,
      } = event.payload;

      // In a real application, you would get the notification recipients from a configuration or user service
      // For now, we'll use hardcoded values
      const recipients = ["manager@voltride.com", "support@voltride.com"];

      if (severity === "critical") {
        // Add maintenance team for critical faults
        recipients.push("maintenance@voltride.com");
      }

      // Send notification
      await this.maintenanceNotificationService.sendFaultReportedNotification(
        recipients,
        scooterSerialNumber,
        scooterModelName,
        title,
        reportedBy,
        reportedDate,
        severity,
        isWarrantyClaim
      );

      console.log(
        `Fault notification sent for scooter ${scooterSerialNumber}: ${title}`
      );
    } catch (error) {
      console.error("Failed to send fault notification:", error);
    }
  }
}
