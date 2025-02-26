import {
  GetScooterByIdQuery,
  IScooterRepository,
  Scooter,
} from "../../../domain";

export class GetScooterByIdHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(query: GetScooterByIdQuery): Promise<{
    success: boolean;
    message: string;
    scooter?: Scooter;
  }> {
    try {
      const { id } = query.payload;

      const scooter = await this.scooterRepository.findById(id);

      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${id} not found`,
        };
      }

      return {
        success: true,
        message: "Scooter retrieved successfully",
        scooter,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to retrieve scooter: ${error.message}`,
      };
    }
  }
}
