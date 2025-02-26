import { IDomainEvent } from "../../../../shared/domain/events/events.interface";
import { FaultSeverity, WarrantyStatus } from "../entity/fault.entity";

export interface FaultResolvedPayload {
  faultId: number;
  faultUid: string;
  scooterId: number;
  scooterUid: string;
  scooterSerialNumber: string;
  scooterModelId: number;
  scooterModelUid: string;
  scooterModelName: string;
  title: string;
  reportedDate: Date;
  resolutionDate: Date;
  downtime: number;
  severity: FaultSeverity;
  repairNotes: string;
  isWarrantyClaim: boolean;
  warrantyStatus: WarrantyStatus;
  cost: number;
}

export class FaultResolvedEvent implements IDomainEvent<FaultResolvedPayload> {
  readonly name = "FaultResolvedEvent";
  readonly occurredOn: Date;
  readonly payload: FaultResolvedPayload;

  constructor(payload: FaultResolvedPayload) {
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
