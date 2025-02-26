import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import {
  IMaintenanceSchedule,
  NotificationStatus,
} from "../../domain/entity/maintenance-schedule.entity";
import { IntervalUnit, MaintenanceType } from "../../domain";
import { SequelizeConfig } from "../../../../shared/infrastructure";
import { ScooterModel } from "./scooter.model";
import { ScooterModelModel } from "./scooter-model.model";

const sequelize = SequelizeConfig.get().sequelize;

interface MaintenanceScheduleCreationAttributes
  extends Optional<IMaintenanceSchedule, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "maintenance_schedules",
  underscored: true,
  timestamps: true,
})
export class MaintenanceScheduleModel extends Model<
  IMaintenanceSchedule,
  MaintenanceScheduleCreationAttributes
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  uid!: string;

  @ForeignKey(() => ScooterModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  scooterId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  scooterUid!: string;

  @ForeignKey(() => ScooterModelModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  scooterModelId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  scooterModelUid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(MaintenanceType)],
    },
  })
  maintenanceType!: MaintenanceType;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  interval!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(IntervalUnit)],
    },
  })
  intervalUnit!: IntervalUnit;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastPerformedDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  nextDueDate!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  notificationSent!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: NotificationStatus.PENDING,
    validate: {
      isIn: [Object.values(NotificationStatus)],
    },
  })
  notificationStatus?: NotificationStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  notificationDate?: Date;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: [],
  })
  notificationRecipients?: string[];

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;
}

sequelize.addModels([MaintenanceScheduleModel]);
