import { MaintenanceSchedule } from "../entity/maintenance-schedule.entity";
import { IntervalUnit, MaintenanceType } from "../entity/scooter-model.entity";

export interface IMaintenanceScheduleRepository {
  create(schedule: MaintenanceSchedule): Promise<MaintenanceSchedule>;
  findAll(): Promise<MaintenanceSchedule[]>;
  findById(id: number): Promise<MaintenanceSchedule | null>;
  findByUid(uid: string): Promise<MaintenanceSchedule | null>;
  findByScooterId(scooterId: number): Promise<MaintenanceSchedule[]>;
  findByScooterUid(scooterUid: string): Promise<MaintenanceSchedule[]>;
  findByScooterModelId(modelId: number): Promise<MaintenanceSchedule[]>;
  findByMaintenanceType(type: MaintenanceType): Promise<MaintenanceSchedule[]>;
  findByIntervalUnit(unit: IntervalUnit): Promise<MaintenanceSchedule[]>;
  findDueSchedules(date?: Date): Promise<MaintenanceSchedule[]>;
  findActiveSchedules(): Promise<MaintenanceSchedule[]>;
  findPendingNotifications(): Promise<MaintenanceSchedule[]>;
  update(schedule: MaintenanceSchedule): Promise<MaintenanceSchedule>;
  delete(id: number): Promise<void>;
}
