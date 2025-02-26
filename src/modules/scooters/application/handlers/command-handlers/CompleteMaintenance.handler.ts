import { v4 as uuidv4 } from "uuid";
import {
  CompleteMaintenanceCommand,
  IMaintenanceRepository,
  IScooterRepository,
  Maintenance,
  MaintenanceStatus,
  MaintenanceCompletedEvent,
} from "../../../domain";
import { IEventStore } from "../../../../../shared/domain";
import { MaintenanceSchedulingService } from "../../services/maintenance-scheduling.service";
import { MaintenanceNotificationService } from "../../services/maintenance-notification.service";

export class CompleteMaintenanceHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly maintenanceRepository: IMaintenanceRepository,
    private readonly maintenanceSchedulingService: MaintenanceSchedulingService,
    private readonly maintenanceNotificationService: MaintenanceNotificationService,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: CompleteMaintenanceCommand
  ): Promise<{ success: boolean; message: string; maintenanceId?: number }> {
    try {
      const {
        maintenanceId,
        maintenanceUid,
        scooterId,
        scooterUid,
        maintenanceType,
        completedDate,
        technician,
        cost,
        notes,
        replacedParts,
      } = command.payload;

      // Validate maintenance exists
      let maintenance: Maintenance | null;
      if (maintenanceId) {
        maintenance = await this.maintenanceRepository.findById(maintenanceId);
      } else if (maintenanceUid) {
        maintenance = await this.maintenanceRepository.findByUid(
          maintenanceUid
        );
      } else {
        // If no maintenance ID is provided, create a new maintenance record
        const scooter = await this.scooterRepository.findById(scooterId);
        if (!scooter) {
          return {
            success: false,
            message: `Scooter with ID ${scooterId} not found`,
          };
        }

        maintenance = new Maintenance({
          uid: uuidv4(),
          scooterId,
          scooterUid,
          maintenanceType,
          status: MaintenanceStatus.SCHEDULED,
          scheduledDate: new Date(), // Use current date as scheduled date
        });

        await this.maintenanceRepository.create(maintenance);
      }

      if (!maintenance) {
        return {
          success: false,
          message: `Maintenance with ID ${
            maintenanceId || maintenanceUid
          } not found`,
        };
      }

      // Complete the maintenance
      maintenance.completeMaintenance(
        completedDate,
        technician,
        cost,
        notes,
        replacedParts
      );

      // Save the updated maintenance
      await this.maintenanceRepository.update(maintenance);

      // Update the maintenance schedule if it exists
      const schedules =
        await this.maintenanceSchedulingService.getMaintenanceSchedulesByScooter(
          maintenance.scooterId
        );
      const matchingSchedule = schedules.find(
        (s) => s.maintenanceType === maintenance.maintenanceType
      );

      if (matchingSchedule) {
        await this.maintenanceSchedulingService.markMaintenanceAsPerformed(
          matchingSchedule.id!,
          completedDate
        );
      }

      // Get the scooter details
      const scooter = await this.scooterRepository.findById(
        maintenance.scooterId
      );
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${maintenance.scooterId} not found`,
        };
      }

      // Publish a maintenance completed event
      const maintenanceCompletedEvent = new MaintenanceCompletedEvent({
        maintenanceId: maintenance.id!,
        maintenanceUid: maintenance.uid,
        scooterId: maintenance.scooterId,
        scooterUid: maintenance.scooterUid,
        scooterSerialNumber: scooter.serialNumber,
        scooterModel: scooter.modelName,
        maintenanceType: maintenance.maintenanceType,
        completedDate: maintenance.completedDate!,
        technician: maintenance.technician!,
        cost: maintenance.cost || 0,
        notes: maintenance.notes,
        replacedParts: maintenance.replacedParts,
        totalCost: maintenance.getTotalCost(),
      });

      this.eventStore.publish(maintenanceCompletedEvent);

      // Send notification
      if (matchingSchedule && matchingSchedule.notificationRecipients) {
        await this.maintenanceNotificationService.sendMaintenanceCompletedNotification(
          matchingSchedule.notificationRecipients,
          scooter.serialNumber,
          scooter.modelName,
          maintenance.maintenanceType,
          maintenance.completedDate!,
          maintenance.technician!,
          maintenance.getTotalCost()
        );
      }

      return {
        success: true,
        message: "Maintenance completed successfully",
        maintenanceId: maintenance.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to complete maintenance: ${error.message}`,
      };
    }
  }
}
