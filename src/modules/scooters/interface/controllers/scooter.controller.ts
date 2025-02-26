import {
  CreateScooterDTO,
  UpdateScooterDTO,
  UpdateScooterStatusDTO,
  UpdateScooterBatteryDTO,
  UpdateScooterMileageDTO,
} from "../dtos";
import {
  CreateScooterCommand,
  UpdateScooterCommand,
  UpdateScooterStatusCommand,
  UpdateScooterBatteryCommand,
  UpdateScooterMileageCommand,
} from "../../domain";
import {
  CreateScooterHandler,
  UpdateScooterHandler,
  UpdateScooterStatusHandler,
  UpdateScooterBatteryHandler,
  UpdateScooterMileageHandler,
} from "../../application";
import {
  ServerRequest,
  ServerResponse,
  ApiResponse,
} from "../../../../shared/infrastructure";

export class ScooterController {
  constructor(
    private readonly createScooterHandler: CreateScooterHandler,
    private readonly updateScooterHandler: UpdateScooterHandler,
    private readonly updateScooterStatusHandler: UpdateScooterStatusHandler,
    private readonly updateScooterBatteryHandler: UpdateScooterBatteryHandler,
    private readonly updateScooterMileageHandler: UpdateScooterMileageHandler
  ) {}

  async createScooter(req: ServerRequest, res: ServerResponse): Promise<void> {
    const dto: CreateScooterDTO = req.body;

    const command = new CreateScooterCommand({
      modelId: dto.modelId,
      modelUid: dto.modelUid,
      modelName: dto.modelName,
      serialNumber: dto.serialNumber,
      status: dto.status,
      batteryLevel: dto.batteryLevel,
      mileage: dto.mileage,
      chargeCycles: dto.chargeCycles,
      purchaseDate: dto.purchaseDate,
      warrantyEndDate: dto.warrantyEndDate,
    });

    try {
      const result = await this.createScooterHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message, {
          scooterId: result.scooterId,
        });
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async updateScooter(req: ServerRequest, res: ServerResponse): Promise<void> {
    const id = parseInt((req.params as any).id);
    const dto: UpdateScooterDTO = req.body;

    const command = new UpdateScooterCommand({
      id,
      status: dto.status,
      batteryLevel: dto.batteryLevel,
      mileage: dto.mileage,
      chargeCycles: dto.chargeCycles,
      lastMaintenanceDate: dto.lastMaintenanceDate,
      lastTechnicalReviewDate: dto.lastTechnicalReviewDate,
      isActive: dto.isActive,
    });

    try {
      const result = await this.updateScooterHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async updateScooterStatus(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    const id = parseInt((req.params as any).id);
    const dto: UpdateScooterStatusDTO = req.body;

    const command = new UpdateScooterStatusCommand({
      id,
      status: dto.status,
    });

    try {
      const result = await this.updateScooterStatusHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async updateScooterBattery(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    const id = parseInt((req.params as any).id);
    const dto: UpdateScooterBatteryDTO = req.body;

    const command = new UpdateScooterBatteryCommand({
      id,
      batteryLevel: dto.batteryLevel,
    });

    try {
      const result = await this.updateScooterBatteryHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async updateScooterMileage(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    const id = parseInt((req.params as any).id);
    const dto: UpdateScooterMileageDTO = req.body;

    const command = new UpdateScooterMileageCommand({
      id,
      mileage: dto.mileage,
    });

    try {
      const result = await this.updateScooterMileageHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getAllScooters(req: ServerRequest, res: ServerResponse): Promise<void> {
    // Implementation for getting all scooters
    ApiResponse.success(res, "Get all scooters endpoint");
  }

  async getScooterById(req: ServerRequest, res: ServerResponse): Promise<void> {
    // Implementation for getting scooter by ID
    const id = parseInt((req.params as any).id);
    ApiResponse.success(res, `Get scooter by ID: ${id} endpoint`);
  }

  async getScooterByUid(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting scooter by UID
    const uid = (req.params as any).uid;
    ApiResponse.success(res, `Get scooter by UID: ${uid} endpoint`);
  }

  async getScootersByModel(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting scooters by model
    const modelId = parseInt((req.params as any).modelId);
    ApiResponse.success(res, `Get scooters by model ID: ${modelId} endpoint`);
  }

  async getScootersByStatus(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting scooters by status
    const status = (req.params as any).status;
    ApiResponse.success(res, `Get scooters by status: ${status} endpoint`);
  }

  async deleteScooter(req: ServerRequest, res: ServerResponse): Promise<void> {
    // Implementation for deleting a scooter
    const id = parseInt((req.params as any).id);
    ApiResponse.success(res, `Delete scooter with ID: ${id} endpoint`);
  }
}
