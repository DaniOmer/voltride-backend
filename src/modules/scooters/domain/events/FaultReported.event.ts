import { IDomainEvent } from "../../../../shared/domain/events/events.interface";
import { FaultSeverity } from "../entity/fault.entity";

export interface FaultReportedPayload {
  faultId: number;
  faultUid: string;
  scooterId: number;
  scooterUid: string;
  scooterSerialNumber: string;
  scooterModelId: number;
  scooterModelUid: string;
  scooterModelName: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: Date;
  severity: FaultSeverity;
  isWarrantyClaim: boolean;
}

export class FaultReportedEvent implements IDomainEvent<FaultReportedPayload> {
  readonly name = "FaultReportedEvent";
  readonly occurredOn: Date;
  readonly payload: FaultReportedPayload;

  constructor(payload: FaultReportedPayload) {
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
