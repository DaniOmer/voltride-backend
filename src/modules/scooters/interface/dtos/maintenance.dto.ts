import {
  MaintenanceType,
  IntervalUnit,
} from "../../domain/entity/scooter-model.entity";
import { IReplacedPart } from "../../domain/entity/maintenance.entity";

export interface ScheduleMaintenanceDTO {
  scooterId: number;
  scooterUid: string;
  scooterModelId: number;
  scooterModelUid: string;
  maintenanceType: MaintenanceType;
  interval: number;
  intervalUnit: IntervalUnit;
  nextDueDate: Date;
  notificationRecipients?: string[];
}

export interface CompleteMaintenanceDTO {
  maintenanceId: number;
  maintenanceUid: string;
  scooterId: number;
  scooterUid: string;
  maintenanceType: MaintenanceType;
  completedDate: Date;
  technician: string;
  cost?: number;
  notes?: string;
  replacedParts?: IReplacedPart[];
}
