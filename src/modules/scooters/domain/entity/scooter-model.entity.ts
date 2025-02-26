export interface IMaintenanceRequirement {
  type: MaintenanceType;
  interval: number;
  intervalUnit: IntervalUnit;
  description: string;
}

export enum MaintenanceType {
  BATTERY_CHECK = "battery_check",
  TECHNICAL_REVIEW = "technical_review",
  BRAKE_CHECK = "brake_check",
  TIRE_PRESSURE = "tire_pressure",
  GENERAL_INSPECTION = "general_inspection",
  SOFTWARE_UPDATE = "software_update",
}

export enum IntervalUnit {
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years",
  KILOMETERS = "kilometers",
  CHARGE_CYCLES = "charge_cycles",
}

export interface IScooterModel {
  id?: number;
  uid: string;
  name: string;
  manufacturer: string;
  maxSpeed: number;
  maxRange: number;
  batteryCapacity: number;
  weight: number;
  maxWeight: number;
  dimensions: string;
  releaseYear: number;
  maintenanceRequirements: IMaintenanceRequirement[];
  warrantyPeriod: number; // in months
  createdAt?: Date;
  updatedAt?: Date;
}

export class ScooterModel implements IScooterModel {
  public readonly id?: number;
  public uid: string;
  public name: string;
  public manufacturer: string;
  public maxSpeed: number;
  public maxRange: number;
  public batteryCapacity: number;
  public weight: number;
  public maxWeight: number;
  public dimensions: string;
  public releaseYear: number;
  public maintenanceRequirements: IMaintenanceRequirement[];
  public warrantyPeriod: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IScooterModel) {
    this.id = data.id;
    this.uid = data.uid;
    this.name = data.name;
    this.manufacturer = data.manufacturer;
    this.maxSpeed = data.maxSpeed;
    this.maxRange = data.maxRange;
    this.batteryCapacity = data.batteryCapacity;
    this.weight = data.weight;
    this.maxWeight = data.maxWeight;
    this.dimensions = data.dimensions;
    this.releaseYear = data.releaseYear;
    this.maintenanceRequirements = data.maintenanceRequirements;
    this.warrantyPeriod = data.warrantyPeriod;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public addMaintenanceRequirement(requirement: IMaintenanceRequirement): void {
    this.maintenanceRequirements.push(requirement);
  }

  public removeMaintenanceRequirement(type: MaintenanceType): void {
    this.maintenanceRequirements = this.maintenanceRequirements.filter(
      (req) => req.type !== type
    );
  }

  public updateMaintenanceRequirement(
    type: MaintenanceType,
    updatedRequirement: Partial<IMaintenanceRequirement>
  ): void {
    this.maintenanceRequirements = this.maintenanceRequirements.map((req) => {
      if (req.type === type) {
        return { ...req, ...updatedRequirement };
      }
      return req;
    });
  }

  toJSON() {
    return {
      id: this.id,
      uid: this.uid,
      name: this.name,
      manufacturer: this.manufacturer,
      maxSpeed: this.maxSpeed,
      maxRange: this.maxRange,
      batteryCapacity: this.batteryCapacity,
      weight: this.weight,
      maxWeight: this.maxWeight,
      dimensions: this.dimensions,
      releaseYear: this.releaseYear,
      maintenanceRequirements: this.maintenanceRequirements,
      warrantyPeriod: this.warrantyPeriod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
