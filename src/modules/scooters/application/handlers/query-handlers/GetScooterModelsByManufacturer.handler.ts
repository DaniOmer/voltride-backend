import {
  GetScooterModelsByManufacturerQuery,
  IScooterModelRepository,
  ScooterModel,
} from "../../../domain";

export interface GetScooterModelsByManufacturerResult {
  success: boolean;
  message: string;
  models?: ScooterModel[];
}

export class GetScooterModelsByManufacturerHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    query: GetScooterModelsByManufacturerQuery
  ): Promise<GetScooterModelsByManufacturerResult> {
    try {
      const models = await this.scooterModelRepository.findByManufacturer(
        query.manufacturer
      );

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
