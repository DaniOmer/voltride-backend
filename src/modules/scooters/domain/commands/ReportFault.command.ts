import { FaultSeverity } from "../entity/fault.entity";

export interface ReportFaultCommandPayload {
  scooterId: number;
  scooterUid: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: Date;
  severity: FaultSeverity;
  isWarrantyClaim: boolean;
}

export class ReportFaultCommand {
  readonly name = "ReportFaultCommand";
  readonly payload: ReportFaultCommandPayload;

  constructor(payload: ReportFaultCommandPayload) {
    this.payload = payload;
  }
}
