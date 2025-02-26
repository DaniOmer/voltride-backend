import { MaintenanceDueEvent } from "../../../domain";
import { MaintenanceNotificationService } from "../../services/maintenance-notification.service";
import {
  IEventStore,
  IDomainEvent,
} from "../../../../../shared/domain/events/events.interface";

export class SendMaintenanceNotificationHandler {
  constructor(
    private readonly maintenanceNotificationService: MaintenanceNotificationService,
    private readonly eventStore: IEventStore
  ) {
    this.registerEvents();
  }

  private registerEvents(): void {
    this.eventStore.subscribe(
      "MaintenanceDueEvent",
      this.handleMaintenanceDueEvent.bind(this)
    );
  }

  private handleMaintenanceDueEvent(event: IDomainEvent<any>): void {
    // Cast the event to MaintenanceDueEvent
    const maintenanceDueEvent = event as MaintenanceDueEvent;
    this.processMaintenanceDueEvent(maintenanceDueEvent).catch((error) => {
      console.error("Error processing maintenance due event:", error);
    });
  }

  private async processMaintenanceDueEvent(
    event: MaintenanceDueEvent
  ): Promise<void> {
    try {
      const {
        scooterSerialNumber,
        scooterModelName,
        maintenanceType,
        scheduledDate,
        daysOverdue,
      } = event.payload;

      // In a real application, you would get the notification recipients from a configuration or user service
      // For now, we'll use hardcoded values
      const recipients = ["manager@voltride.com", "maintenance@voltride.com"];

      // Send notification
      await this.maintenanceNotificationService.sendMaintenanceDueNotification(
        recipients,
        scooterSerialNumber,
        scooterModelName,
        maintenanceType,
        scheduledDate
      );

      console.log(
        `Maintenance notification sent for scooter ${scooterSerialNumber} (${maintenanceType})`
      );
    } catch (error) {
      console.error("Failed to send maintenance notification:", error);
    }
  }
}
