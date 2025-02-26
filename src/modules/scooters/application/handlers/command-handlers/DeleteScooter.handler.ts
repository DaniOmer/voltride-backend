import { DeleteScooterCommand, IScooterRepository } from "../../../domain";

export class DeleteScooterHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(command: DeleteScooterCommand): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const { id } = command.payload;

      // Check if scooter exists
      const scooter = await this.scooterRepository.findById(id);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${id} not found`,
        };
      }

      await this.scooterRepository.delete(id);

      return {
        success: true,
        message: `Scooter with ID ${id} deleted successfully`,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to delete scooter: ${error.message}`,
      };
    }
  }
}
