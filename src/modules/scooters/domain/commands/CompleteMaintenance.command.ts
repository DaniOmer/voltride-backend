import { MaintenanceType } from "../entity/scooter-model.entity";
import { IReplacedPart } from "../entity/maintenance.entity";

export interface CompleteMaintenanceCommandPayload {
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

export class CompleteMaintenanceCommand {
  readonly name = "CompleteMaintenanceCommand";
  readonly payload: CompleteMaintenanceCommandPayload;

  constructor(payload: CompleteMaintenanceCommandPayload) {
    this.payload = payload;
  }
}
