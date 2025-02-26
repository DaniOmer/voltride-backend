import { Maintenance, MaintenanceStatus } from "../entity/maintenance.entity";
import { MaintenanceType } from "../entity/scooter-model.entity";

export interface IMaintenanceRepository {
  create(maintenance: Maintenance): Promise<Maintenance>;
  findAll(): Promise<Maintenance[]>;
  findById(id: number): Promise<Maintenance | null>;
  findByUid(uid: string): Promise<Maintenance | null>;
  findByScooterId(scooterId: number): Promise<Maintenance[]>;
  findByScooterUid(scooterUid: string): Promise<Maintenance[]>;
  findByMaintenanceType(type: MaintenanceType): Promise<Maintenance[]>;
  findByStatus(status: MaintenanceStatus): Promise<Maintenance[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Maintenance[]>;
  findByTechnician(technician: string): Promise<Maintenance[]>;
  update(maintenance: Maintenance): Promise<Maintenance>;
  delete(id: number): Promise<void>;
}
