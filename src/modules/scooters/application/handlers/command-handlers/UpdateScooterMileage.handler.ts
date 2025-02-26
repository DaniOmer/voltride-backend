import {
  UpdateScooterMileageCommand,
  IScooterRepository,
} from "../../../domain";
import { IEventStore } from "../../../../../shared/domain";

export class UpdateScooterMileageCommandHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: UpdateScooterMileageCommand
  ): Promise<{ success: boolean; message: string; scooterId?: number }> {
    try {
      const { id, mileage } = command.payload;

      // Find the scooter
      const scooter = await this.scooterRepository.findById(id);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${id} not found`,
        };
      }

      // Update scooter mileage
      scooter.updateMileage(mileage);
      const updatedScooter = await this.scooterRepository.update(scooter);

      return {
        success: true,
        message: "Scooter mileage updated successfully",
        scooterId: updatedScooter.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to update scooter mileage: ${error.message}`,
      };
    }
  }
}
