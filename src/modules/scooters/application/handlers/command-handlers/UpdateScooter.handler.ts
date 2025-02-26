import { UpdateScooterCommand, IScooterRepository } from "../../../domain";
import { IEventStore } from "../../../../../shared/domain";

export class UpdateScooterHandler {
  constructor(
    private readonly scooterRepository: IScooterRepository,
    private readonly eventStore: IEventStore
  ) {}

  async execute(
    command: UpdateScooterCommand
  ): Promise<{ success: boolean; message: string; scooterId?: number }> {
    try {
      const {
        id,
        status,
        batteryLevel,
        mileage,
        chargeCycles,
        lastMaintenanceDate,
        lastTechnicalReviewDate,
        isActive,
      } = command.payload;

      // Find the scooter
      const scooter = await this.scooterRepository.findById(id);
      if (!scooter) {
        return {
          success: false,
          message: `Scooter with ID ${id} not found`,
        };
      }

      // Update scooter properties
      if (status !== undefined) scooter.status = status;
      if (batteryLevel !== undefined) scooter.batteryLevel = batteryLevel;
      if (mileage !== undefined) scooter.mileage = mileage;
      if (chargeCycles !== undefined) scooter.chargeCycles = chargeCycles;
      if (lastMaintenanceDate !== undefined)
        scooter.lastMaintenanceDate = lastMaintenanceDate;
      if (lastTechnicalReviewDate !== undefined)
        scooter.lastTechnicalReviewDate = lastTechnicalReviewDate;
      if (isActive !== undefined) scooter.isActive = isActive;

      const updatedScooter = await this.scooterRepository.update(scooter);

      return {
        success: true,
        message: "Scooter updated successfully",
        scooterId: updatedScooter.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to update scooter: ${error.message}`,
      };
    }
  }
}
