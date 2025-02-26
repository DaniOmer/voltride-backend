import { v4 as uuidv4 } from "uuid";
import {
  CreateScooterModelCommand,
  IScooterModelRepository,
  ScooterModel,
} from "../../../domain";

export interface CreateScooterModelResult {
  success: boolean;
  message: string;
  modelId?: number;
  model?: ScooterModel;
}

export class CreateScooterModelHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    command: CreateScooterModelCommand
  ): Promise<CreateScooterModelResult> {
    try {
      // Check if model with same name already exists
      const existingModel = await this.scooterModelRepository.findByName(
        command.name
      );

      if (existingModel) {
        return {
          success: false,
          message: `Scooter model with name ${command.name} already exists`,
        };
      }

      // Create new scooter model
      const scooterModel = new ScooterModel({
        uid: uuidv4(),
        name: command.name,
        manufacturer: command.manufacturer,
        maxSpeed: command.maxSpeed,
        maxRange: command.maxRange,
        batteryCapacity: command.batteryCapacity,
        weight: command.weight,
        maxWeight: command.maxWeight,
        dimensions: command.dimensions,
        releaseYear: command.releaseYear,
        maintenanceRequirements: [],
        warrantyPeriod: command.warrantyPeriod || 12, // Default warranty period of 12 months
      });

      const createdModel = await this.scooterModelRepository.create(
        scooterModel
      );

      return {
        success: true,
        message: "Scooter model created successfully",
        modelId: createdModel.id,
        model: createdModel,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to create scooter model: ${error.message}`,
      };
    }
  }
}
