import { AppConfig } from "./config/app.config";

import {
  SequelizeConfig,
  MongooseConfig,
  ServerFactory,
  ServerAdapter,
  EventStore,
} from "./shared/infrastructure";
import { composeUserModule } from "./modules/users/infrastructure";
import { composeTokenModule } from "./modules/tokens/infrastructure";
import { composeScooterModule } from "./modules/scooters/infrastructure";

async function startApp() {
  try {
    // Initialize mongo database
    const mongoose = await MongooseConfig.get();
    mongoose.mongoose.connection.on("error", (error) => {
      console.error("Error connecting to MongoDB", error);
      process.exit(1);
    });

    // Initialize postgres database
    const sequelize = SequelizeConfig.get().sequelize;
    await sequelize.authenticate();
    await sequelize.sync({ alter: false, force: false });

    // Initialize server
    const app = ServerFactory.create(AppConfig.server.name as ServerAdapter);

    // Event Store
    const eventStore = EventStore.getInstance();

    // Register token module
    const tokenModule = composeTokenModule(app, eventStore);

    // Register user module with token validate handler
    const userModule = composeUserModule(
      app,
      eventStore,
      tokenModule.tokenValidateHandler
    );

    // Register scooter module
    const scooterModule = composeScooterModule(app, eventStore);

    // Server is ready
    console.log(
      `${AppConfig.server.name} Server is ready and listening on port ${AppConfig.server.port}`
    );
  } catch (error) {
    console.error("Error starting the app", error);
    process.exit(1);
  }
}

startApp();
