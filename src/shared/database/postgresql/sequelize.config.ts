import { Sequelize } from "sequelize";

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

  public static async get(): Promise<SequelizeConfig> {
    if (!this.instance) {
      const sequelize = await this.initSequelize();
      this.instance = new SequelizeConfig(sequelize);
    }
    return this.instance;
  }

  private static async initSequelize(): Promise<Sequelize> {
    const sequelize = new Sequelize({
      dialect: AppConfig.sequelize.dialect as SequelizeDialect,
      host: AppConfig.sequelize.host,
      username: AppConfig.sequelize.username,
      password: AppConfig.sequelize.password,
      database: AppConfig.sequelize.database,
    });
    return sequelize;
  }
}
