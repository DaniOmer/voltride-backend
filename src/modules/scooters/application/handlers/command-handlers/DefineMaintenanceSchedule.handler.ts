import {
  DefineMaintenanceScheduleCommand,
  DefineMaintenanceScheduleCommandPayload,
  IScooterModelRepository,
  ScooterModel,
  MaintenanceScheduleDefinedEvent,
} from "../../../domain";
import { IEventStore, BadRequestError } from "../../../../../shared/domain";

export class DefineMaintenanceScheduleHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: DefineMaintenanceScheduleCommand
  ): Promise<{
    success: boolean;
    message: string;
    scooterModel?: ScooterModel;
  }> {
    try {
      const {
        scooterModelId,
        scooterModelUid,
        maintenanceType,
        interval,
        intervalUnit,
        description,
      } = command.payload;

      // Validate scooter model exists
      const scooterModel = await this.scooterModelRepository.findById(
        scooterModelId
      );
      if (!scooterModel) {
        throw new BadRequestError({
          message: `Scooter model with ID ${scooterModelId} not found`,
          logging: true,
        });
      }

      // Check if maintenance requirement already exists for this type
      const existingRequirement = scooterModel.maintenanceRequirements.find(
        (req) => req.type === maintenanceType
      );

      if (existingRequirement) {
        // Update existing requirement
        scooterModel.updateMaintenanceRequirement(maintenanceType, {
          interval,
          intervalUnit,
          description,
        });
      } else {
        // Add new maintenance requirement
        scooterModel.addMaintenanceRequirement({
          type: maintenanceType,
          interval,
          intervalUnit,
          description,
        });
      }

      // Save the updated scooter model
      await this.scooterModelRepository.update(scooterModel);

      // Publish event
      this.eventStore.publish(
        new MaintenanceScheduleDefinedEvent({
          scooterModelId,
          scooterModelUid,
          scooterModelName: scooterModel.name,
          maintenanceType,
          interval,
          intervalUnit,
          description,
        })
      );

      return {
        success: true,
        message: "Maintenance schedule defined successfully",
        scooterModel,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to define maintenance schedule: ${error.message}`,
      };
    }
  }
}
