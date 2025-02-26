import {
  GetAllScootersQuery,
  IScooterRepository,
  Scooter,
} from "../../../domain";

export class GetAllScootersHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(query: GetAllScootersQuery): Promise<{
    success: boolean;
    message: string;
    scooters?: Scooter[];
  }> {
    try {
      const scooters = await this.scooterRepository.findAll();

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
