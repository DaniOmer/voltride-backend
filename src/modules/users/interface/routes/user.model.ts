import { DataTypes } from "sequelize";
import { SequelizeConfig } from "../../../../shared/database/postgresql/sequelize.config";

let User: any;

async function initializeUserModel() {
  const sequelize = (await SequelizeConfig.get()).sequelize;

  User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  await sequelize.sync();
}

initializeUserModel().catch(console.error);

export { User };
