import {
  ScheduleMaintenanceDTO,
  CompleteMaintenanceDTO,
  DefineMaintenanceScheduleDTO,
} from "../dtos";
import {
  ScheduleMaintenanceCommand,
  CompleteMaintenanceCommand,
  DefineMaintenanceScheduleCommand,
} from "../../domain";
import {
  ScheduleMaintenanceHandler,
  CompleteMaintenanceHandler,
  DefineMaintenanceScheduleHandler,
} from "../../application";
import {
  ServerRequest,
  ServerResponse,
  ApiResponse,
} from "../../../../shared/infrastructure";

export class MaintenanceController {
  constructor(
    private readonly scheduleMaintenanceHandler: ScheduleMaintenanceHandler,
    private readonly completeMaintenanceHandler: CompleteMaintenanceHandler,
    private readonly defineMaintenanceScheduleHandler: DefineMaintenanceScheduleHandler
  ) {}

  async scheduleMaintenance(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    const dto: ScheduleMaintenanceDTO = req.body;

    const command = new ScheduleMaintenanceCommand({
      scooterId: dto.scooterId,
      scooterUid: dto.scooterUid,
      scooterModelId: dto.scooterModelId,
      scooterModelUid: dto.scooterModelUid,
      maintenanceType: dto.maintenanceType,
      interval: dto.interval,
      intervalUnit: dto.intervalUnit,
      nextDueDate: dto.nextDueDate,
      notificationRecipients: dto.notificationRecipients,
    });

    try {
      const result = await this.scheduleMaintenanceHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message, {
          scheduleId: result.scheduleId,
        });
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async completeMaintenance(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    const dto: CompleteMaintenanceDTO = req.body;

    const command = new CompleteMaintenanceCommand({
      maintenanceId: dto.maintenanceId,
      maintenanceUid: dto.maintenanceUid,
      scooterId: dto.scooterId,
      scooterUid: dto.scooterUid,
      maintenanceType: dto.maintenanceType,
      completedDate: dto.completedDate,
      technician: dto.technician,
      cost: dto.cost,
      notes: dto.notes,
      replacedParts: dto.replacedParts,
    });

    try {
      const result = await this.completeMaintenanceHandler.execute(command);
      if (result.success) {
        ApiResponse.success(res, result.message);
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async defineMaintenanceSchedule(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    const dto: DefineMaintenanceScheduleDTO = req.body;

    const command = new DefineMaintenanceScheduleCommand({
      scooterModelId: dto.scooterModelId,
      scooterModelUid: dto.scooterModelUid,
      maintenanceType: dto.maintenanceType,
      interval: dto.interval,
      intervalUnit: dto.intervalUnit,
      description: dto.description,
    });

    try {
      const result = await this.defineMaintenanceScheduleHandler.execute(
        command
      );
      if (result.success) {
        ApiResponse.success(res, result.message, {
          scooterModel: result.scooterModel,
        });
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getAllMaintenances(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting all maintenances
    ApiResponse.success(res, "Get all maintenances endpoint");
  }

  async getMaintenanceById(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting maintenance by ID
    const id = parseInt((req.params as any).id);
    ApiResponse.success(res, `Get maintenance by ID: ${id} endpoint`);
  }

  async getMaintenanceByUid(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting maintenance by UID
    const uid = (req.params as any).uid;
    ApiResponse.success(res, `Get maintenance by UID: ${uid} endpoint`);
  }

  async getMaintenancesByScooterId(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting maintenances by scooter ID
    const scooterId = parseInt((req.params as any).scooterId);
    ApiResponse.success(
      res,
      `Get maintenances by scooter ID: ${scooterId} endpoint`
    );
  }

  async getAllMaintenanceSchedules(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting all maintenance schedules
    ApiResponse.success(res, "Get all maintenance schedules endpoint");
  }

  async getMaintenanceScheduleById(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting maintenance schedule by ID
    const id = parseInt((req.params as any).id);
    ApiResponse.success(res, `Get maintenance schedule by ID: ${id} endpoint`);
  }

  async getMaintenanceSchedulesByScooterId(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting maintenance schedules by scooter ID
    const scooterId = parseInt((req.params as any).scooterId);
    ApiResponse.success(
      res,
      `Get maintenance schedules by scooter ID: ${scooterId} endpoint`
    );
  }

  async getMaintenanceSchedulesByModelId(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    // Implementation for getting maintenance schedules by model ID
    const modelId = parseInt((req.params as any).modelId);
    ApiResponse.success(
      res,
      `Get maintenance schedules by model ID: ${modelId} endpoint`
    );
  }
}
