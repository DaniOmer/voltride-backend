import { WarrantyStatus } from "../entity/fault.entity";

export interface ResolveFaultCommandPayload {
  faultId: number;
  faultUid: string;
  resolutionDate: Date;
  repairNotes: string;
  cost?: number;
  warrantyStatus?: WarrantyStatus;
  warrantyNotes?: string;
}

export class ResolveFaultCommand {
  readonly name = "ResolveFaultCommand";
  readonly payload: ResolveFaultCommandPayload;

  constructor(payload: ResolveFaultCommandPayload) {
    this.payload = payload;
  }
}
