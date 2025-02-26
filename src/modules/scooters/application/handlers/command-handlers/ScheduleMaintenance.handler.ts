import {
  ScheduleMaintenanceCommand,
  ScheduleMaintenanceCommandPayload,
  IScooterRepository,
  IScooterModelRepository,
} from "../../../domain";
import { MaintenanceSchedulingService } from "../../services/maintenance-scheduling.service";
import { IEventStore } from "../../../../../shared/domain";

export class ScheduleMaintenanceHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly scooterModelRepository: IScooterModelRepository,
    private readonly eventStore: IEventStore,
    private readonly maintenanceSchedulingService: MaintenanceSchedulingService
  ) {}

  async execute(
    command: ScheduleMaintenanceCommand
  ): Promise<{ success: boolean; message: string; scheduleId?: number }> {
    try {
      const {
        scooterId,
        scooterUid,
        scooterModelId,
        scooterModelUid,
        maintenanceType,
        interval,
        intervalUnit,
        nextDueDate,
        notificationRecipients,
      } = command.payload;

      // Validate scooter exists
      const scooter = await this.scooterRepository.findById(scooterId);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${scooterId} not found`,
        };
      }

      // Validate scooter model exists
      const scooterModel = await this.scooterModelRepository.findById(
        scooterModelId
      );
      if (!scooterModel) {
        return {
          success: false,
          message: `Scooter model with ID ${scooterModelId} not found`,
        };
      }

      // Schedule the maintenance
      const schedule =
        await this.maintenanceSchedulingService.scheduleMaintenanceForScooter(
          scooterId,
          scooterUid,
          scooterModelId,
          scooterModelUid,
          maintenanceType,
          interval,
          intervalUnit,
          nextDueDate,
          notificationRecipients
        );

      return {
        success: true,
        message: "Maintenance scheduled successfully",
        scheduleId: schedule.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to schedule maintenance: ${error.message}`,
      };
    }
  }
}
