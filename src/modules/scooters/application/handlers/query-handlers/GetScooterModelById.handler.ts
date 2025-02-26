import {
  GetScooterModelByIdQuery,
  IScooterModelRepository,
  ScooterModel,
} from "../../../domain";

export interface GetScooterModelByIdResult {
  success: boolean;
  message: string;
  model?: ScooterModel;
}

export class GetScooterModelByIdHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    query: GetScooterModelByIdQuery
  ): Promise<GetScooterModelByIdResult> {
    try {
      const model = await this.scooterModelRepository.findById(query.id);

      if (!model) {
        return {
          success: false,
          message: `Scooter model with ID ${query.id} not found`,
        };
      }

      return {
        success: true,
        message: "Scooter model retrieved successfully",
        model,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to retrieve scooter model: ${error.message}`,
      };
    }
  }
}
