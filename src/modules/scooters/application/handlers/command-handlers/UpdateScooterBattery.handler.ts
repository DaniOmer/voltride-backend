import {
  UpdateScooterBatteryCommand,
  IScooterRepository,
} from "../../../domain";
import { IEventStore } from "../../../../../shared/domain";

export class UpdateScooterBatteryCommandHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: UpdateScooterBatteryCommand
  ): Promise<{ success: boolean; message: string; scooterId?: number }> {
    try {
      const { id, batteryLevel } = command.payload;

      // Find the scooter
      const scooter = await this.scooterRepository.findById(id);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${id} not found`,
        };
      }

      // Update scooter battery level
      scooter.updateBatteryLevel(batteryLevel);
      const updatedScooter = await this.scooterRepository.update(scooter);

      return {
        success: true,
        message: "Scooter battery level updated successfully",
        scooterId: updatedScooter.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to update scooter battery level: ${error.message}`,
      };
    }
  }
}
