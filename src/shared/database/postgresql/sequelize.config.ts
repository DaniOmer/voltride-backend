import { Sequelize } from "sequelize-typescript";

import { AppConfig } from "../../../config/app.config";

export type SequelizeDialect =
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";

export class SequelizeConfig {
  private static instance?: SequelizeConfig;
  readonly sequelize: Sequelize;

  private constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  public static get(): SequelizeConfig {
    if (!this.instance) {
      const sequelize = this.initSequelize();
      this.instance = new SequelizeConfig(sequelize);
    }
    return this.instance;
  }

  private static initSequelize(): Sequelize {
    const sequelize = new Sequelize({
      dialect: AppConfig.sequelize.dialect as SequelizeDialect,
      host: AppConfig.sequelize.host,
      username: AppConfig.sequelize.username,
      password: AppConfig.sequelize.password,
      database: AppConfig.sequelize.database,
      logging: false,
    });
    return sequelize;
  }
}
