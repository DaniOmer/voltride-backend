export interface IScooter {
  id?: number;
  uid: string;
  serialNumber: string;
  modelId: number;
  modelUid: string;
  modelName: string;
  status: ScooterStatus;
  batteryLevel: number;
  mileage: number;
  chargeCycles: number;
  lastMaintenanceDate?: Date;
  lastTechnicalReviewDate?: Date;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ScooterStatus {
  AVAILABLE = "available",
  IN_USE = "in_use",
  MAINTENANCE = "maintenance",
  REPAIR = "repair",
  INACTIVE = "inactive",
}

export class Scooter implements IScooter {
  public readonly id?: number;
  public uid: string;
  public serialNumber: string;
  public modelId: number;
  public modelUid: string;
  public modelName: string;
  public status: ScooterStatus;
  public batteryLevel: number;
  public mileage: number;
  public chargeCycles: number;
  public lastMaintenanceDate?: Date;
  public lastTechnicalReviewDate?: Date;
  public purchaseDate?: Date;
  public warrantyEndDate?: Date;
  public isActive: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IScooter) {
    this.id = data.id;
    this.uid = data.uid;
    this.serialNumber = data.serialNumber;
    this.modelId = data.modelId;
    this.modelUid = data.modelUid;
    this.modelName = data.modelName;
    this.status = data.status;
    this.batteryLevel = data.batteryLevel;
    this.mileage = data.mileage;
    this.chargeCycles = data.chargeCycles;
    this.lastMaintenanceDate = data.lastMaintenanceDate;
    this.lastTechnicalReviewDate = data.lastTechnicalReviewDate;
    this.purchaseDate = data.purchaseDate;
    this.warrantyEndDate = data.warrantyEndDate;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public updateStatus(status: ScooterStatus): void {
    this.status = status;
  }

  public updateBatteryLevel(level: number): void {
    this.batteryLevel = Math.min(Math.max(level, 0), 100);
  }

  public incrementChargeCycles(): void {
    this.chargeCycles += 1;
  }

  public updateMileage(mileage: number): void {
    this.mileage = mileage;
  }

  public performMaintenance(): void {
    this.lastMaintenanceDate = new Date();
    this.status = ScooterStatus.AVAILABLE;
  }

  public performTechnicalReview(): void {
    this.lastTechnicalReviewDate = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      uid: this.uid,
      serialNumber: this.serialNumber,
      modelId: this.modelId,
      modelUid: this.modelUid,
      modelName: this.modelName,
      status: this.status,
      batteryLevel: this.batteryLevel,
      mileage: this.mileage,
      chargeCycles: this.chargeCycles,
      lastMaintenanceDate: this.lastMaintenanceDate,
      lastTechnicalReviewDate: this.lastTechnicalReviewDate,
      purchaseDate: this.purchaseDate,
      warrantyEndDate: this.warrantyEndDate,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
