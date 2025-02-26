import {
  GetScootersByStatusQuery,
  IScooterRepository,
  Scooter,
} from "../../../domain";

export class GetScootersByStatusHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(query: GetScootersByStatusQuery): Promise<{
    success: boolean;
    message: string;
    scooters?: Scooter[];
  }> {
    try {
      const { status } = query.payload;

      const scooters = await this.scooterRepository.findByStatus(status);

      if (!scooters || scooters.length === 0) {
        return {
          success: false,
          message: `No scooters found with status ${status}`,
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
