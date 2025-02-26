export enum FaultSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum FaultStatus {
  REPORTED = "reported",
  UNDER_INVESTIGATION = "under_investigation",
  DIAGNOSED = "diagnosed",
  IN_REPAIR = "in_repair",
  RESOLVED = "resolved",
  UNRESOLVED = "unresolved",
}

export enum WarrantyStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  NOT_APPLICABLE = "not_applicable",
}

export interface IFault {
  id?: number;
  uid: string;
  scooterId: number;
  scooterUid: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: Date;
  severity: FaultSeverity;
  status: FaultStatus;
  diagnosisNotes?: string;
  repairNotes?: string;
  resolutionDate?: Date;
  downtime?: number; // in hours
  isWarrantyClaim: boolean;
  warrantyStatus: WarrantyStatus;
  warrantyNotes?: string;
  cost?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Fault implements IFault {
  public readonly id?: number;
  public uid: string;
  public scooterId: number;
  public scooterUid: string;
  public title: string;
  public description: string;
  public reportedBy: string;
  public reportedDate: Date;
  public severity: FaultSeverity;
  public status: FaultStatus;
  public diagnosisNotes?: string;
  public repairNotes?: string;
  public resolutionDate?: Date;
  public downtime?: number;
  public isWarrantyClaim: boolean;
  public warrantyStatus: WarrantyStatus;
  public warrantyNotes?: string;
  public cost?: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IFault) {
    this.id = data.id;
    this.uid = data.uid;
    this.scooterId = data.scooterId;
    this.scooterUid = data.scooterUid;
    this.title = data.title;
    this.description = data.description;
    this.reportedBy = data.reportedBy;
    this.reportedDate = data.reportedDate;
    this.severity = data.severity;
    this.status = data.status;
    this.diagnosisNotes = data.diagnosisNotes;
    this.repairNotes = data.repairNotes;
    this.resolutionDate = data.resolutionDate;
    this.downtime = data.downtime;
    this.isWarrantyClaim = data.isWarrantyClaim;
    this.warrantyStatus = data.warrantyStatus;
    this.warrantyNotes = data.warrantyNotes;
    this.cost = data.cost;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public updateStatus(status: FaultStatus): void {
    this.status = status;
  }

  public updateSeverity(severity: FaultSeverity): void {
    this.severity = severity;
  }

  public addDiagnosisNotes(notes: string): void {
    this.diagnosisNotes = notes;
    this.status = FaultStatus.DIAGNOSED;
  }

  public startRepair(): void {
    this.status = FaultStatus.IN_REPAIR;
  }

  public resolveIssue(
    resolutionDate: Date,
    repairNotes: string,
    cost?: number
  ): void {
    this.status = FaultStatus.RESOLVED;
    this.resolutionDate = resolutionDate;
    this.repairNotes = repairNotes;
    this.cost = cost;

    // Calculate downtime in hours
    if (this.reportedDate && resolutionDate) {
      const diffMs = resolutionDate.getTime() - this.reportedDate.getTime();
      this.downtime = Math.round(diffMs / (1000 * 60 * 60));
    }
  }

  public markUnresolved(notes: string): void {
    this.status = FaultStatus.UNRESOLVED;
    this.repairNotes = notes;
  }

  public submitWarrantyClaim(notes?: string): void {
    this.isWarrantyClaim = true;
    this.warrantyStatus = WarrantyStatus.PENDING;
    this.warrantyNotes = notes;
  }

  public updateWarrantyStatus(status: WarrantyStatus, notes?: string): void {
    this.warrantyStatus = status;
    if (notes) {
      this.warrantyNotes = notes;
    }
  }

  toJSON() {
    return {
      id: this.id,
      uid: this.uid,
      scooterId: this.scooterId,
      scooterUid: this.scooterUid,
      title: this.title,
      description: this.description,
      reportedBy: this.reportedBy,
      reportedDate: this.reportedDate,
      severity: this.severity,
      status: this.status,
      diagnosisNotes: this.diagnosisNotes,
      repairNotes: this.repairNotes,
      resolutionDate: this.resolutionDate,
      downtime: this.downtime,
      isWarrantyClaim: this.isWarrantyClaim,
      warrantyStatus: this.warrantyStatus,
      warrantyNotes: this.warrantyNotes,
      cost: this.cost,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
