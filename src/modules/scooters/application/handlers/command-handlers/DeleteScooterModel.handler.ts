import {
  DeleteScooterModelCommand,
  IScooterModelRepository,
} from "../../../domain";

export interface DeleteScooterModelResult {
  success: boolean;
  message: string;
}

export class DeleteScooterModelHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    command: DeleteScooterModelCommand
  ): Promise<DeleteScooterModelResult> {
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

      await this.scooterModelRepository.delete(command.id);

      return {
        success: true,
        message: "Scooter model deleted successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to delete scooter model: ${error.message}`,
      };
    }
  }
}
