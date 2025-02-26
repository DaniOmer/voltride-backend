import {
  GetScooterModelByUidQuery,
  IScooterModelRepository,
  ScooterModel,
} from "../../../domain";

export interface GetScooterModelByUidResult {
  success: boolean;
  message: string;
  model?: ScooterModel;
}

export class GetScooterModelByUidHandler {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async execute(
    query: GetScooterModelByUidQuery
  ): Promise<GetScooterModelByUidResult> {
    try {
      const model = await this.scooterModelRepository.findByUid(query.uid);

      if (!model) {
        return {
          success: false,
          message: `Scooter model with UID ${query.uid} not found`,
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
