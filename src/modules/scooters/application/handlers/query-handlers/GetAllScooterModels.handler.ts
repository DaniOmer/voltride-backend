import {
  GetAllScooterModelsQuery,
  IScooterModelRepository,
  ScooterModel,
} from "../../../domain";

export interface GetAllScooterModelsResult {
  success: boolean;
  message: string;
  models?: ScooterModel[];
}

export class GetAllScooterModelsHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    query: GetAllScooterModelsQuery
  ): Promise<GetAllScooterModelsResult> {
    try {
      const models = await this.scooterModelRepository.findAll();

      return {
        success: true,
        message: "Scooter models retrieved successfully",
        models,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to retrieve scooter models: ${error.message}`,
      };
    }
  }
}
