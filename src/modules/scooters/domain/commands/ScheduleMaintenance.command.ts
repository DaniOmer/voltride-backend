import { MaintenanceType, IntervalUnit } from "../entity/scooter-model.entity";

export interface ScheduleMaintenanceCommandPayload {
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

export class ScheduleMaintenanceCommand {
  readonly name = "ScheduleMaintenanceCommand";
  readonly payload: ScheduleMaintenanceCommandPayload;

  constructor(payload: ScheduleMaintenanceCommandPayload) {
    this.payload = payload;
  }
}
