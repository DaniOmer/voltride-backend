import { AppConfig } from "./config/app.config";
import {
  SequelizeConfig,
  MongooseConfig,
  ServerFactory,
  ServerAdapter,
} from "./shared";
import { initUserRouter } from "./modules/users/composition";

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

    // Register user routes
    const userRouter = initUserRouter();
    userRouter.registerRoutes(app);
  } catch (error) {
    console.error("Error starting the app", error);
    process.exit(1);
  }
}

startApp();
