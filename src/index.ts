import { AppConfig } from "./config/app.config";
import { MongooseConfig } from "./shared/database/mongodb/mongoose.config";
import { SequelizeConfig } from "./shared/database/postgresql/sequelize.config";
import { ServerFactory, ServerAdapter } from "./shared/server/server.factory";
import { userRouter } from "./modules/users/interface/routes/user.router";

async function startApp() {
  try {
    // Initialize mongo database
    await MongooseConfig.get();

    // Initialize postgres database
    (await SequelizeConfig.get()).sequelize.authenticate();

    // Initialize server
    const app = ServerFactory.create(AppConfig.server.name as ServerAdapter);

    // Register user routes
    userRouter.registerRoutes(app);
  } catch (error) {
    console.error("Error starting the app", error);
    process.exit(1);
  }
}

startApp();
