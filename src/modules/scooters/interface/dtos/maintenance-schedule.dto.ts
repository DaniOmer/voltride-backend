import {
  MaintenanceType,
  IntervalUnit,
} from "../../domain/entity/scooter-model.entity";

export interface DefineMaintenanceScheduleDTO {
  scooterModelId: number;
  scooterModelUid: string;
  maintenanceType: MaintenanceType;
  interval: number;
  intervalUnit: IntervalUnit;
  description: string;
}
