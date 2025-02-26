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
  DeleteScooterCommand,
  GetAllScootersQuery,
  GetScooterByIdQuery,
  GetScooterByUidQuery,
  GetScootersByModelQuery,
  GetScootersByStatusQuery,
  IScooterRepository,
} from "../../domain";
import {
  CreateScooterHandler,
  UpdateScooterHandler,
  UpdateScooterStatusHandler,
  UpdateScooterBatteryHandler,
  UpdateScooterMileageHandler,
  DeleteScooterHandler,
  GetAllScootersHandler,
  GetScooterByIdHandler,
  GetScooterByUidHandler,
  GetScootersByModelHandler,
  GetScootersByStatusHandler,
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
    private readonly updateScooterMileageHandler: UpdateScooterMileageHandler,
    private readonly deleteScooterHandler: DeleteScooterHandler,
    private readonly getAllScootersHandler: GetAllScootersHandler,
    private readonly getScooterByIdHandler: GetScooterByIdHandler,
    private readonly getScooterByUidHandler: GetScooterByUidHandler,
    private readonly getScootersByModelHandler: GetScootersByModelHandler,
    private readonly getScootersByStatusHandler: GetScootersByStatusHandler
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
          scooter: result.scooter,
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
    try {
      const query = new GetAllScootersQuery();
      const result = await this.getAllScootersHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, { scooters: result.scooters });
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScooterById(req: ServerRequest, res: ServerResponse): Promise<void> {
    try {
      const id = parseInt((req.params as any).id);
      const query = new GetScooterByIdQuery({ id });

      const result = await this.getScooterByIdHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, { scooter: result.scooter });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScooterByUid(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const uid = (req.params as any).uid;
      const query = new GetScooterByUidQuery({ uid });

      const result = await this.getScooterByUidHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, { scooter: result.scooter });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScootersByModel(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const modelId = parseInt((req.params as any).modelId);
      const query = new GetScootersByModelQuery({ modelId });

      const result = await this.getScootersByModelHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, {
          count: result.scooters?.length || 0,
          scooters: result.scooters,
        });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScootersByStatus(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const status = (req.params as any).status;
      const query = new GetScootersByStatusQuery({ status });

      const result = await this.getScootersByStatusHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, {
          count: result.scooters?.length || 0,
          scooters: result.scooters,
        });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async deleteScooter(req: ServerRequest, res: ServerResponse): Promise<void> {
    try {
      const id = parseInt((req.params as any).id);
      const command = new DeleteScooterCommand({ id });

      const result = await this.deleteScooterHandler.execute(command);

      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }
}
