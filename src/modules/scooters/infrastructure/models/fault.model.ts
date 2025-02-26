import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import {
  IFault,
  FaultSeverity,
  FaultStatus,
  WarrantyStatus,
} from "../../domain/entity/fault.entity";
import { SequelizeConfig } from "../../../../shared/infrastructure";
import { ScooterModel } from "./scooter.model";

const sequelize = SequelizeConfig.get().sequelize;

interface FaultCreationAttributes
  extends Optional<IFault, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "faults",
  underscored: true,
  timestamps: true,
})
export class FaultModel extends Model<IFault, FaultCreationAttributes> {
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
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  reportedBy!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reportedDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(FaultSeverity)],
    },
  })
  severity!: FaultSeverity;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: FaultStatus.REPORTED,
    validate: {
      isIn: [Object.values(FaultStatus)],
    },
  })
  status!: FaultStatus;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  diagnosisNotes?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  repairNotes?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  resolutionDate?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  downtime?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isWarrantyClaim!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: WarrantyStatus.NOT_APPLICABLE,
    validate: {
      isIn: [Object.values(WarrantyStatus)],
    },
  })
  warrantyStatus!: WarrantyStatus;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  warrantyNotes?: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  cost?: number;
}

sequelize.addModels([FaultModel]);
