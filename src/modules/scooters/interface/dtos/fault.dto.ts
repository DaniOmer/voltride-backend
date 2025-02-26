import {
  FaultSeverity,
  WarrantyStatus,
} from "../../domain/entity/fault.entity";

export interface ReportFaultDTO {
  scooterId: number;
  scooterUid: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: Date;
  severity: FaultSeverity;
  isWarrantyClaim: boolean;
}

export interface ResolveFaultDTO {
  faultId: number;
  faultUid: string;
  resolutionDate: Date;
  repairNotes: string;
  cost?: number;
  warrantyStatus?: WarrantyStatus;
  warrantyNotes?: string;
}

export interface UpdateFaultSeverityDTO {
  severity: FaultSeverity;
}

export interface UpdateWarrantyStatusDTO {
  warrantyStatus: WarrantyStatus;
  warrantyNotes?: string;
}
