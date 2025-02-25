import {
  NotificationFactory,
  ServerStrategy,
} from "../../../../shared/infrastructure";
import { IEventStore } from "../../../../shared/domain";
import { PostgresUserRepository } from "../repositories/postgres.user.repository";
import {
  UserCreateHandler,
  UserValidateEmailHandler,
  TokenCreatedListener,
  TokenValidatedListener,
  SendWelcomeMessageHandler,
  VerifyUserEmailHandler,
  TokenValidationService,
} from "../../application";
import { UserController, UserRouter } from "../../interface";
import { TokenValidateHandler } from "../../../tokens/application";

export function composeUserModule(
  app: ServerStrategy,
  eventStore: IEventStore,
  tokenValidateHandler: TokenValidateHandler
) {
  const userRepository = new PostgresUserRepository();

  // Command Handlers
  const createUserHandler = new UserCreateHandler(userRepository, eventStore);

  // Services
  const tokenValidationService = new TokenValidationService(
    tokenValidateHandler
  );

  // Command Handlers
  const validateEmailHandler = new UserValidateEmailHandler(
    tokenValidationService.validateToken.bind(tokenValidationService)
  );

  // Event Handlers
  const sendWelcomeHandler = new SendWelcomeMessageHandler(
    NotificationFactory.create("email")
  );

  const verifyUserEmailHandler = new VerifyUserEmailHandler(
    eventStore,
    userRepository
  );

  // Event Listeners
  const tokenCreatedListener = new TokenCreatedListener(eventStore, (event) =>
    sendWelcomeHandler.handle(event)
  );
  tokenCreatedListener.listen();

  const tokenValidatedListener = new TokenValidatedListener(
    eventStore,
    (event) => verifyUserEmailHandler.handle(event)
  );
  tokenValidatedListener.listen();

  // Controller
  const userController = new UserController(
    createUserHandler,
    validateEmailHandler
  );

  // Router
  const userRouter = new UserRouter(userController);
  userRouter.registerRoutes(app);

  return {
    userRouter,
  };
}
