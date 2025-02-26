import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import { IMaintenance, MaintenanceStatus } from "../../domain";
import { MaintenanceType } from "../../domain";
import { SequelizeConfig } from "../../../../shared/infrastructure";
import { ScooterModel } from "./scooter.model";

const sequelize = SequelizeConfig.get().sequelize;

interface MaintenanceCreationAttributes
  extends Optional<IMaintenance, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "maintenances",
  underscored: true,
  timestamps: true,
})
export class MaintenanceModel extends Model<
  IMaintenance,
  MaintenanceCreationAttributes
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(MaintenanceType)],
    },
  })
  maintenanceType!: MaintenanceType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: MaintenanceStatus.SCHEDULED,
    validate: {
      isIn: [Object.values(MaintenanceStatus)],
    },
  })
  status!: MaintenanceStatus;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  scheduledDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  completedDate?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  technician?: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  cost?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes?: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: [],
  })
  replacedParts?: any[];
}

sequelize.addModels([MaintenanceModel]);
