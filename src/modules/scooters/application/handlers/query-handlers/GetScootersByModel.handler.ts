import {
  GetScootersByModelQuery,
  IScooterRepository,
  Scooter,
} from "../../../domain";

export class GetScootersByModelHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(query: GetScootersByModelQuery): Promise<{
    success: boolean;
    message: string;
    scooters?: Scooter[];
  }> {
    try {
      const { modelId } = query.payload;

      const scooters = await this.scooterRepository.findByModelId(modelId);

      if (!scooters || scooters.length === 0) {
        return {
          success: false,
          message: `No scooters found for model ID ${modelId}`,
        };
      }

      return {
        success: true,
        message: "Scooters retrieved successfully",
        scooters,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to retrieve scooters: ${error.message}`,
      };
    }
  }
}
