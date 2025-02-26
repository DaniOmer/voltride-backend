import { Optional } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

import { IScooterModel } from "../../domain";
import { SequelizeConfig } from "../../../../shared/infrastructure";

const sequelize = SequelizeConfig.get().sequelize;

interface ScooterModelCreationAttributes
  extends Optional<IScooterModel, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "scooter_models",
  underscored: true,
  timestamps: true,
})
export class ScooterModelModel extends Model<
  IScooterModel,
  ScooterModelCreationAttributes
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  uid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  manufacturer!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  maxSpeed!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  maxRange!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  batteryCapacity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  weight!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  maxWeight!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dimensions!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  releaseYear!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: [],
  })
  maintenanceRequirements!: any[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 12, // Default warranty period of 12 months
  })
  warrantyPeriod!: number;
}

sequelize.addModels([ScooterModelModel]);
