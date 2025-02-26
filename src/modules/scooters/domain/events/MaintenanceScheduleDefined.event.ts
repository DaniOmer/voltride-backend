import { IDomainEvent } from "../../../../shared/domain/events/events.interface";
import { MaintenanceType, IntervalUnit } from "../entity/scooter-model.entity";

export interface MaintenanceScheduleDefinedEventPayload {
  scooterModelId: number;
  scooterModelUid: string;
  scooterModelName: string;
  maintenanceType: MaintenanceType;
  interval: number;
  intervalUnit: IntervalUnit;
  description: string;
}

export class MaintenanceScheduleDefinedEvent implements IDomainEvent {
  readonly name = "MaintenanceScheduleDefinedEvent";
  readonly payload: MaintenanceScheduleDefinedEventPayload;
  readonly occurredOn: Date;

  constructor(payload: MaintenanceScheduleDefinedEventPayload) {
    this.payload = payload;
    this.occurredOn = new Date();
  }
}
