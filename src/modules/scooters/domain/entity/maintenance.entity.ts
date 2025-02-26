import { MaintenanceType } from "./scooter-model.entity";

export enum MaintenanceStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IMaintenance {
  id?: number;
  uid: string;
  scooterId: number;
  scooterUid: string;
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: Date;
  completedDate?: Date;
  technician?: string;
  cost?: number;
  notes?: string;
  replacedParts?: IReplacedPart[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReplacedPart {
  name: string;
  serialNumber?: string;
  cost: number;
  warrantyPeriod?: number; // in months
}

export class Maintenance implements IMaintenance {
  public readonly id?: number;
  public uid: string;
  public scooterId: number;
  public scooterUid: string;
  public maintenanceType: MaintenanceType;
  public status: MaintenanceStatus;
  public scheduledDate: Date;
  public completedDate?: Date;
  public technician?: string;
  public cost?: number;
  public notes?: string;
  public replacedParts?: IReplacedPart[];
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IMaintenance) {
    this.id = data.id;
    this.uid = data.uid;
    this.scooterId = data.scooterId;
    this.scooterUid = data.scooterUid;
    this.maintenanceType = data.maintenanceType;
    this.status = data.status;
    this.scheduledDate = data.scheduledDate;
    this.completedDate = data.completedDate;
    this.technician = data.technician;
    this.cost = data.cost;
    this.notes = data.notes;
    this.replacedParts = data.replacedParts || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public startMaintenance(): void {
    this.status = MaintenanceStatus.IN_PROGRESS;
  }

  public completeMaintenance(
    completedDate: Date,
    technician: string,
    cost?: number,
    notes?: string,
    replacedParts?: IReplacedPart[]
  ): void {
    this.status = MaintenanceStatus.COMPLETED;
    this.completedDate = completedDate;
    this.technician = technician;
    this.cost = cost;
    this.notes = notes;
    this.replacedParts = replacedParts || this.replacedParts;
  }

  public cancelMaintenance(notes?: string): void {
    this.status = MaintenanceStatus.CANCELLED;
    this.notes = notes || this.notes;
  }

  public reschedule(newDate: Date): void {
    this.scheduledDate = newDate;
  }

  public addReplacedPart(part: IReplacedPart): void {
    if (!this.replacedParts) {
      this.replacedParts = [];
    }
    this.replacedParts.push(part);

    // Update total cost
    if (this.cost === undefined) {
      this.cost = 0;
    }
    this.cost += part.cost;
  }

  public getTotalCost(): number {
    if (!this.replacedParts || this.replacedParts.length === 0) {
      return this.cost || 0;
    }

    const partsCost = this.replacedParts.reduce(
      (sum, part) => sum + part.cost,
      0
    );
    return (this.cost || 0) + partsCost;
  }

  toJSON() {
    return {
      id: this.id,
      uid: this.uid,
      scooterId: this.scooterId,
      scooterUid: this.scooterUid,
      maintenanceType: this.maintenanceType,
      status: this.status,
      scheduledDate: this.scheduledDate,
      completedDate: this.completedDate,
      technician: this.technician,
      cost: this.cost,
      notes: this.notes,
      replacedParts: this.replacedParts,
      totalCost: this.getTotalCost(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
