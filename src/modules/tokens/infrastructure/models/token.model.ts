import { Optional } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

import { IToken, TokenType, TokenStatus } from "../../domain";
import { SequelizeConfig } from "../../../../shared/infrastructure";

const sequelize = SequelizeConfig.get().sequelize;

interface TokenCreationAttributes
  extends Optional<IToken, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "tokens",
  underscored: true,
  timestamps: true,
})
export class TokenModel extends Model<TokenCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userUid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: TokenType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: TokenStatus;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt!: Date;
}

sequelize.addModels([TokenModel]);
sequelize.sync();
