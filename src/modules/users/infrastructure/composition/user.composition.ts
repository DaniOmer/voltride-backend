import {
  NotificationFactory,
  ServerStrategy,
} from "../../../../shared/infrastructure";
import { IEventStore } from "../../../../shared/domain";
import { PostgresUserRepository } from "../repositories/postgres.user.repository";
import {
  UserCreateHandler,
  TokenCreatedListener,
  SendWelcomeMessageHandler,
} from "../../application";
import { UserController, UserRouter } from "../../interface";

export function composeUserModule(
  app: ServerStrategy,
  eventStore: IEventStore
) {
  const userRepository = new PostgresUserRepository();

  // Command Handlers
  const createUserHandler = new UserCreateHandler(userRepository, eventStore);

  // Event Handlers
  const sendWelcomeHandler = new SendWelcomeMessageHandler(
    NotificationFactory.create("email")
  );

  // Event Listeners
  const tokenCreatedListener = new TokenCreatedListener(eventStore, (event) =>
    sendWelcomeHandler.handle(event)
  );
  tokenCreatedListener.listen();

  // Controller
  const userController = new UserController(createUserHandler);

  // Router
  const userRouter = new UserRouter(userController);
  userRouter.registerRoutes(app);

  return {
    userRouter,
  };
}
