import {
  ServerRequest,
  ServerResponse,
  ApiResponse,
} from "../../../../shared/infrastructure";
import {
  CreateScooterModelCommand,
  UpdateScooterModelCommand,
  DeleteScooterModelCommand,
  GetAllScooterModelsQuery,
  GetScooterModelByIdQuery,
  GetScooterModelByUidQuery,
  GetScooterModelsByManufacturerQuery,
} from "../../domain";
import {
  CreateScooterModelHandler,
  UpdateScooterModelHandler,
  DeleteScooterModelHandler,
  GetAllScooterModelsHandler,
  GetScooterModelByIdHandler,
  GetScooterModelByUidHandler,
  GetScooterModelsByManufacturerHandler,
} from "../../application";
import { CreateScooterModelDTO, UpdateScooterModelDTO } from "../dtos";

export class ScooterModelController {
  constructor(
    private readonly createScooterModelHandler: CreateScooterModelHandler,
    private readonly updateScooterModelHandler: UpdateScooterModelHandler,
    private readonly deleteScooterModelHandler: DeleteScooterModelHandler,
    private readonly getAllScooterModelsHandler: GetAllScooterModelsHandler,
    private readonly getScooterModelByIdHandler: GetScooterModelByIdHandler,
    private readonly getScooterModelByUidHandler: GetScooterModelByUidHandler,
    private readonly getScooterModelsByManufacturerHandler: GetScooterModelsByManufacturerHandler
  ) {}

  async createScooterModel(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const dto: CreateScooterModelDTO = req.body;

      // Validate required fields
      if (!dto.name || !dto.manufacturer) {
        return ApiResponse.error(
          res,
          "Name and manufacturer are required fields",
          400
        );
      }

      const command = new CreateScooterModelCommand({
        name: dto.name,
        manufacturer: dto.manufacturer,
        maxSpeed: dto.maxSpeed,
        maxRange: dto.maxRange,
        batteryCapacity: dto.batteryCapacity,
        weight: dto.weight,
        maxWeight: dto.maxWeight,
        dimensions: dto.dimensions,
        releaseYear: dto.releaseYear,
        warrantyPeriod: dto.warrantyPeriod,
      });

      const result = await this.createScooterModelHandler.execute(command);

      if (result.success) {
        ApiResponse.success(
          res,
          result.message,
          { modelId: result.modelId, model: result.model },
          201
        );
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getAllScooterModels(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const query = new GetAllScooterModelsQuery();
      const result = await this.getAllScooterModelsHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, { models: result.models });
      } else {
        ApiResponse.error(res, result.message, 400);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScooterModelById(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const id = parseInt((req.params as any).id);
      if (isNaN(id)) {
        return ApiResponse.error(res, "Invalid ID format", 400);
      }

      const query = new GetScooterModelByIdQuery({ id });
      const result = await this.getScooterModelByIdHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, { model: result.model });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScooterModelByUid(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const uid = (req.params as any).uid;
      const query = new GetScooterModelByUidQuery({ uid });
      const result = await this.getScooterModelByUidHandler.execute(query);

      if (result.success) {
        ApiResponse.success(res, result.message, { model: result.model });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async getScooterModelsByManufacturer(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const manufacturer = (req.params as any).manufacturer;
      const query = new GetScooterModelsByManufacturerQuery({ manufacturer });
      const result = await this.getScooterModelsByManufacturerHandler.execute(
        query
      );

      if (result.success) {
        ApiResponse.success(res, result.message, {
          count: result.models?.length || 0,
          models: result.models,
        });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async updateScooterModel(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const id = parseInt((req.params as any).id);
      if (isNaN(id)) {
        return ApiResponse.error(res, "Invalid ID format", 400);
      }

      const dto: UpdateScooterModelDTO = req.body;
      const command = new UpdateScooterModelCommand({
        id,
        name: dto.name,
        manufacturer: dto.manufacturer,
        maxSpeed: dto.maxSpeed,
        maxRange: dto.maxRange,
        batteryCapacity: dto.batteryCapacity,
        weight: dto.weight,
        maxWeight: dto.maxWeight,
        dimensions: dto.dimensions,
        releaseYear: dto.releaseYear,
        warrantyPeriod: dto.warrantyPeriod,
      });

      const result = await this.updateScooterModelHandler.execute(command);

      if (result.success) {
        ApiResponse.success(res, result.message, { model: result.model });
      } else {
        ApiResponse.error(res, result.message, 404);
      }
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async deleteScooterModel(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const id = parseInt((req.params as any).id);
      if (isNaN(id)) {
        return ApiResponse.error(res, "Invalid ID format", 400);
      }

      const command = new DeleteScooterModelCommand({ id });
      const result = await this.deleteScooterModelHandler.execute(command);

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
