import {
  UpdateScooterModelCommand,
  IScooterModelRepository,
} from "../../../domain";

export interface UpdateScooterModelResult {
  success: boolean;
  message: string;
  model?: any;
}

export class UpdateScooterModelHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    command: UpdateScooterModelCommand
  ): Promise<UpdateScooterModelResult> {
    try {
      const scooterModel = await this.scooterModelRepository.findById(
        command.id
      );

      if (!scooterModel) {
        return {
          success: false,
          message: `Scooter model with ID ${command.id} not found`,
        };
      }

      // Update fields if provided
      if (command.name !== undefined) scooterModel.name = command.name;
      if (command.manufacturer !== undefined)
        scooterModel.manufacturer = command.manufacturer;
      if (command.maxSpeed !== undefined)
        scooterModel.maxSpeed = command.maxSpeed;
      if (command.maxRange !== undefined)
        scooterModel.maxRange = command.maxRange;
      if (command.batteryCapacity !== undefined)
        scooterModel.batteryCapacity = command.batteryCapacity;
      if (command.weight !== undefined) scooterModel.weight = command.weight;
      if (command.maxWeight !== undefined)
        scooterModel.maxWeight = command.maxWeight;
      if (command.dimensions !== undefined)
        scooterModel.dimensions = command.dimensions;
      if (command.releaseYear !== undefined)
        scooterModel.releaseYear = command.releaseYear;
      if (command.warrantyPeriod !== undefined)
        scooterModel.warrantyPeriod = command.warrantyPeriod;

      const updatedModel = await this.scooterModelRepository.update(
        scooterModel
      );

      return {
        success: true,
        message: "Scooter model updated successfully",
        model: updatedModel,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to update scooter model: ${error.message}`,
      };
    }
  }
}
