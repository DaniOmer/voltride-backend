import {
  UpdateScooterStatusCommand,
  IScooterRepository,
} from "../../../domain";
import { IEventStore } from "../../../../../shared/domain";

export class UpdateScooterStatusCommandHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: UpdateScooterStatusCommand
  ): Promise<{ success: boolean; message: string; scooterId?: number }> {
    try {
      const { id, status } = command.payload;

      // Find the scooter
      const scooter = await this.scooterRepository.findById(id);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${id} not found`,
        };
      }

      // Update scooter status
      scooter.updateStatus(status);
      const updatedScooter = await this.scooterRepository.update(scooter);

      return {
        success: true,
        message: "Scooter status updated successfully",
        scooterId: updatedScooter.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to update scooter status: ${error.message}`,
      };
    }
  }
}
