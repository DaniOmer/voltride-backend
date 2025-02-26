import { SequelizeConfig } from "./shared/infrastructure/database/postgresql/sequelize.config";

// Import all models to ensure they're registered with Sequelize
import "./modules/scooters/infrastructure/models/scooter.model";
import "./modules/scooters/infrastructure/models/scooter-model.model";
import "./modules/scooters/infrastructure/models/maintenance.model";
import "./modules/scooters/infrastructure/models/maintenance-schedule.model";
import "./modules/scooters/infrastructure/models/fault.model";

async function syncDatabase() {
  const sequelize = SequelizeConfig.get().sequelize;

  try {
    console.log("Synchronizing database models...");
    await sequelize.sync({ alter: true });
    console.log("Database synchronization completed successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
