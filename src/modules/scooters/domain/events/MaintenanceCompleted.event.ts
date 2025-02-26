import { IDomainEvent } from "../../../../shared/domain/events/events.interface";
import { MaintenanceType } from "../entity/scooter-model.entity";
import { IReplacedPart } from "../entity/maintenance.entity";

export interface MaintenanceCompletedPayload {
  maintenanceId: number;
  maintenanceUid: string;
  scooterId: number;
  scooterUid: string;
  scooterSerialNumber: string;
  scooterModel: string;
  maintenanceType: MaintenanceType;
  completedDate: Date;
  technician: string;
  cost: number;
  notes?: string;
  replacedParts?: IReplacedPart[];
  totalCost: number;
}

export class MaintenanceCompletedEvent
  implements IDomainEvent<MaintenanceCompletedPayload>
{
  readonly name = "MaintenanceCompletedEvent";
  readonly occurredOn: Date;
  readonly payload: MaintenanceCompletedPayload;

  constructor(payload: MaintenanceCompletedPayload) {
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
