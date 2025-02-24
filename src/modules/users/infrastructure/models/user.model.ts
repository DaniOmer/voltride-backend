import { Optional } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

import { IUser } from "../../domain";
import { SequelizeConfig } from "../../../../shared";

const sequelize = SequelizeConfig.get().sequelize;

interface UserCreationAttributes
  extends Optional<IUser, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "users",
  underscored: true,
  timestamps: true,
})
export class UserModel extends Model<UserCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address?: string;
}

sequelize.addModels([UserModel]);
sequelize.sync();
