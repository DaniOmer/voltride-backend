import { IDomainEvent } from "../../../../shared/domain/events/events.interface";
import { MaintenanceType } from "../entity/scooter-model.entity";

export interface MaintenanceDuePayload {
  scooterId: number;
  scooterUid: string;
  scooterSerialNumber: string;
  scooterModelId: number;
  scooterModelUid: string;
  scooterModelName: string;
  maintenanceType: MaintenanceType;
  scheduledDate: Date;
  daysOverdue: number;
}

export class MaintenanceDueEvent
  implements IDomainEvent<MaintenanceDuePayload>
{
  readonly name = "MaintenanceDueEvent";
  readonly occurredOn: Date;
  readonly payload: MaintenanceDuePayload;

  constructor(payload: MaintenanceDuePayload) {
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
