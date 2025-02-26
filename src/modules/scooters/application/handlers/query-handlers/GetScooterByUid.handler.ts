import {
  GetScooterByUidQuery,
  IScooterRepository,
  Scooter,
} from "../../../domain";

export class GetScooterByUidHandler {
  constructor(private readonly scooterRepository: IScooterRepository) {}

  async execute(query: GetScooterByUidQuery): Promise<{
    success: boolean;
    message: string;
    scooter?: Scooter;
  }> {
    try {
      const { uid } = query.payload;

      const scooter = await this.scooterRepository.findByUid(uid);

      if (!scooter) {
        return {
          success: false,
          message: `Scooter with UID ${uid} not found`,
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
