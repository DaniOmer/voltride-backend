import { MaintenanceCompletedEvent } from "../../../domain";
import { MaintenanceSchedulingService } from "../../services/maintenance-scheduling.service";
import { EventStore } from "../../../../../shared/infrastructure/events/event.store";
import { IDomainEvent } from "../../../../../shared/domain/events/events.interface";

export class UpdateMaintenanceScheduleHandler {
  constructor(
    private readonly maintenanceSchedulingService: MaintenanceSchedulingService,
    private readonly eventStore: EventStore
  ) {
    this.registerEvents();
  }

  private registerEvents(): void {
    this.eventStore.subscribe(
      "MaintenanceCompletedEvent",
      this.handleMaintenanceCompletedEvent.bind(this)
    );
  }

  private handleMaintenanceCompletedEvent(event: IDomainEvent<any>): void {
    // Cast the event to MaintenanceCompletedEvent
    const maintenanceCompletedEvent = event as MaintenanceCompletedEvent;
    this.processMaintenanceCompletedEvent(maintenanceCompletedEvent).catch(
      (error) => {
        console.error("Error processing maintenance completed event:", error);
      }
    );
  }

  private async processMaintenanceCompletedEvent(
    event: MaintenanceCompletedEvent
  ): Promise<void> {
    try {
      const { scooterId, scooterUid, maintenanceType, completedDate } =
        event.payload;

      // Find maintenance schedules for this scooter and maintenance type
      const schedules =
        await this.maintenanceSchedulingService.getMaintenanceSchedulesByScooter(
          scooterId
        );

      const matchingSchedule = schedules.find(
        (s) => s.maintenanceType === maintenanceType
      );

      if (matchingSchedule) {
        // Update the last performed date and calculate the next due date
        await this.maintenanceSchedulingService.markMaintenanceAsPerformed(
          matchingSchedule.id!,
          completedDate
        );

        console.log(
          `Maintenance schedule updated for scooter ${scooterUid} (${maintenanceType})`
        );
      } else {
        console.log(
          `No maintenance schedule found for scooter ${scooterUid} (${maintenanceType})`
        );
      }
    } catch (error) {
      console.error("Failed to update maintenance schedule:", error);
    }
  }
}
