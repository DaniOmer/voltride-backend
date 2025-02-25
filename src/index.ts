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
    sequelize.authenticate();

    // Initialize server
    const app = ServerFactory.create(AppConfig.server.name as ServerAdapter);

    // Event Store
    const eventStore = new EventStore();

    // Register user module
    const userModule = composeUserModule(app, eventStore);

    // Register token module
    const tokenModule = composeTokenModule(app, eventStore);
  } catch (error) {
    console.error("Error starting the app", error);
    process.exit(1);
  }
}

startApp();
