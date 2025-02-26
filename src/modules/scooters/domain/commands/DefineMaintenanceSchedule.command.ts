import { MaintenanceType, IntervalUnit } from "../entity/scooter-model.entity";

export interface DefineMaintenanceScheduleCommandPayload {
  scooterModelId: number;
  scooterModelUid: string;
  maintenanceType: MaintenanceType;
  interval: number;
  intervalUnit: IntervalUnit;
  description: string;
}

export class DefineMaintenanceScheduleCommand {
  readonly name = "DefineMaintenanceScheduleCommand";
  readonly payload: DefineMaintenanceScheduleCommandPayload;

  constructor(payload: DefineMaintenanceScheduleCommandPayload) {
    this.payload = payload;
  }
}
