import { ScooterStatus } from "../../domain/entity/scooter.entity";

export interface CreateScooterDTO {
  serialNumber: string;
  modelId: number;
  modelUid: string;
  modelName: string;
  status?: ScooterStatus;
  batteryLevel?: number;
  mileage?: number;
  chargeCycles?: number;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
}

export interface UpdateScooterDTO {
  status?: ScooterStatus;
  batteryLevel?: number;
  mileage?: number;
  chargeCycles?: number;
  lastMaintenanceDate?: Date;
  lastTechnicalReviewDate?: Date;
  isActive?: boolean;
}

export interface UpdateScooterStatusDTO {
  status: ScooterStatus;
}

export interface UpdateScooterBatteryDTO {
  batteryLevel: number;
}

export interface UpdateScooterMileageDTO {
  mileage: number;
}
