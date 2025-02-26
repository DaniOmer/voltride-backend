import { Optional } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

import { IScooter, ScooterStatus } from "../../domain";
import { SequelizeConfig } from "../../../../shared/infrastructure";

const sequelize = SequelizeConfig.get().sequelize;

interface ScooterCreationAttributes
  extends Optional<IScooter, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "scooters",
  underscored: true,
  timestamps: true,
})
export class ScooterModel extends Model<IScooter, ScooterCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  uid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  serialNumber!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  modelId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  modelUid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  modelName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: ScooterStatus.AVAILABLE,
    validate: {
      isIn: [Object.values(ScooterStatus)],
    },
  })
  status!: ScooterStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 100,
  })
  batteryLevel!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  mileage!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  chargeCycles!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastMaintenanceDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastTechnicalReviewDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  purchaseDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  warrantyEndDate?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;
}

sequelize.addModels([ScooterModel]);
