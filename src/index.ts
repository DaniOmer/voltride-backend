import { AppConfig } from "./config/app.config";
import { ServerFactory, ServerAdapter } from "./shared/server/server.factory";
import { userRouter } from "./modules/users/interface/routes/user.router";

async function startApp() {
  // Initialize server
  const app = ServerFactory.create(AppConfig.WEB_SERVER as ServerAdapter);

  // Register user routes
  userRouter.registerRoutes(app);
}

startApp();
