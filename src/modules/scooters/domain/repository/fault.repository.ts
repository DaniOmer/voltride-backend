import {
  Fault,
  FaultSeverity,
  FaultStatus,
  WarrantyStatus,
} from "../entity/fault.entity";

export interface IFaultRepository {
  create(fault: Fault): Promise<Fault>;
  findAll(): Promise<Fault[]>;
  findById(id: number): Promise<Fault | null>;
  findByUid(uid: string): Promise<Fault | null>;
  findByScooterId(scooterId: number): Promise<Fault[]>;
  findByScooterUid(scooterUid: string): Promise<Fault[]>;
  findByStatus(status: FaultStatus): Promise<Fault[]>;
  findBySeverity(severity: FaultSeverity): Promise<Fault[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Fault[]>;
  findByReportedBy(reportedBy: string): Promise<Fault[]>;
  findWarrantyClaims(status?: WarrantyStatus): Promise<Fault[]>;
  findUnresolvedFaults(): Promise<Fault[]>;
  findByDowntimeRange(minHours: number, maxHours: number): Promise<Fault[]>;
  update(fault: Fault): Promise<Fault>;
  delete(id: number): Promise<void>;
}
