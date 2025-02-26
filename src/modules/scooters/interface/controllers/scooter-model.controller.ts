import { v4 as uuidv4 } from "uuid";
import {
  ServerRequest,
  ServerResponse,
  ApiResponse,
} from "../../../../shared/infrastructure";
import { IScooterModelRepository, ScooterModel } from "../../domain";
import { CreateScooterModelDTO, UpdateScooterModelDTO } from "../dtos";

export class ScooterModelController {
  constructor(
    private readonly scooterModelRepository: IScooterModelRepository
  ) {}

  async createScooterModel(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const data = req.body as CreateScooterModelDTO;

      // Validate required fields
      if (!data.name || !data.manufacturer) {
        return ApiResponse.error(
          res,
          "Name and manufacturer are required fields",
          400
        );
      }

      // Check if model with same name already exists
      const existingModel = await this.scooterModelRepository.findByName(
        data.name
      );
      if (existingModel) {
        return ApiResponse.error(
          res,
          `Scooter model with name ${data.name} already exists`,
          409
        );
      }

      // Create new scooter model
      const scooterModel = new ScooterModel({
        uid: uuidv4(),
        name: data.name,
        manufacturer: data.manufacturer,
        maxSpeed: data.maxSpeed,
        maxRange: data.maxRange,
        batteryCapacity: data.batteryCapacity,
        weight: data.weight,
        maxWeight: data.maxWeight,
        dimensions: data.dimensions,
        releaseYear: data.releaseYear,
        maintenanceRequirements: [],
        warrantyPeriod: data.warrantyPeriod || 12, // Default warranty period of 12 months
      });

      const createdModel = await this.scooterModelRepository.create(
        scooterModel
      );

      return ApiResponse.success(
        res,
        "Scooter model created successfully",
        createdModel,
        201
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        `Failed to create scooter model: ${error.message}`,
        500
      );
    }
  }

  async getAllScooterModels(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const scooterModels = await this.scooterModelRepository.findAll();
      return ApiResponse.success(
        res,
        "Scooter models retrieved successfully",
        scooterModels
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        `Failed to retrieve scooter models: ${error.message}`,
        500
      );
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

      const scooterModel = await this.scooterModelRepository.findById(id);
      if (!scooterModel) {
        return ApiResponse.error(
          res,
          `Scooter model with ID ${id} not found`,
          404
        );
      }

      return ApiResponse.success(
        res,
        "Scooter model retrieved successfully",
        scooterModel
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        `Failed to retrieve scooter model: ${error.message}`,
        500
      );
    }
  }

  async getScooterModelByUid(
    req: ServerRequest,
    res: ServerResponse
  ): Promise<void> {
    try {
      const uid = (req.params as any).uid;
      const scooterModel = await this.scooterModelRepository.findByUid(uid);
      if (!scooterModel) {
        return ApiResponse.error(
          res,
          `Scooter model with UID ${uid} not found`,
          404
        );
      }

      return ApiResponse.success(
        res,
        "Scooter model retrieved successfully",
        scooterModel
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        `Failed to retrieve scooter model: ${error.message}`,
        500
      );
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

      const data = req.body as UpdateScooterModelDTO;
      const scooterModel = await this.scooterModelRepository.findById(id);
      if (!scooterModel) {
        return ApiResponse.error(
          res,
          `Scooter model with ID ${id} not found`,
          404
        );
      }

      // Update fields if provided
      if (data.name !== undefined) scooterModel.name = data.name;
      if (data.manufacturer !== undefined)
        scooterModel.manufacturer = data.manufacturer;
      if (data.maxSpeed !== undefined) scooterModel.maxSpeed = data.maxSpeed;
      if (data.maxRange !== undefined) scooterModel.maxRange = data.maxRange;
      if (data.batteryCapacity !== undefined)
        scooterModel.batteryCapacity = data.batteryCapacity;
      if (data.weight !== undefined) scooterModel.weight = data.weight;
      if (data.maxWeight !== undefined) scooterModel.maxWeight = data.maxWeight;
      if (data.dimensions !== undefined)
        scooterModel.dimensions = data.dimensions;
      if (data.releaseYear !== undefined)
        scooterModel.releaseYear = data.releaseYear;
      if (data.warrantyPeriod !== undefined)
        scooterModel.warrantyPeriod = data.warrantyPeriod;

      const updatedModel = await this.scooterModelRepository.update(
        scooterModel
      );

      return ApiResponse.success(
        res,
        "Scooter model updated successfully",
        updatedModel
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        `Failed to update scooter model: ${error.message}`,
        500
      );
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

      const scooterModel = await this.scooterModelRepository.findById(id);
      if (!scooterModel) {
        return ApiResponse.error(
          res,
          `Scooter model with ID ${id} not found`,
          404
        );
      }

      await this.scooterModelRepository.delete(id);

      return ApiResponse.success(res, "Scooter model deleted successfully");
    } catch (error: any) {
      return ApiResponse.error(
        res,
        `Failed to delete scooter model: ${error.message}`,
        500
      );
    }
  }
}
