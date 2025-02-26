import { v4 as uuidv4 } from "uuid";
import {
  CreateScooterCommand,
  IScooterRepository,
  Scooter,
  ScooterStatus,
} from "../../../domain";

export class CreateScooterHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(
    command: CreateScooterCommand
  ): Promise<{
    success: boolean;
    message: string;
    scooterId?: number;
    scooter?: Scooter;
  }> {
    try {
      const {
        serialNumber,
        modelId,
        modelUid,
        modelName,
        status,
        batteryLevel,
        mileage,
        chargeCycles,
        purchaseDate,
        warrantyEndDate,
      } = command.payload;

      // Check if scooter with same serial number already exists
      const existingScooter = await this.scooterRepository.findBySerialNumber(
        serialNumber
      );
      if (existingScooter) {
        return {
          success: false,
          message: `Scooter with serial number ${serialNumber} already exists`,
        };
      }

      const scooter = new Scooter({
        uid: uuidv4(),
        serialNumber,
        modelId,
        modelUid,
        modelName,
        status: status || ScooterStatus.AVAILABLE,
        batteryLevel: batteryLevel || 100,
        mileage: mileage || 0,
        chargeCycles: chargeCycles || 0,
        purchaseDate,
        warrantyEndDate,
        isActive: true,
      });

      const createdScooter = await this.scooterRepository.create(scooter);

      return {
        success: true,
        message: "Scooter created successfully",
        scooterId: createdScooter.id,
        scooter: createdScooter,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to create scooter: ${error.message}`,
      };
    }
  }
}
