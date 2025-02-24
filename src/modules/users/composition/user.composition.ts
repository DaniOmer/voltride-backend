import { EventStore, NotificationFactory } from "../../../shared";
import { PostgresUserRepository } from "../infrastructure";
import {
  UserCreateHandler,
  UserCreatedListener,
  SendWelcomeMessageHandler,
} from "../application";
import { UserController, UserRouter } from "../interface";

export function composeUserModule() {
  const userRepository = new PostgresUserRepository();
  const eventStore = new EventStore();

  // Command Handlers
  const createUserHandler = new UserCreateHandler(userRepository, eventStore);

  // Event Listeners
  const userCreatedListener = new UserCreatedListener(
    eventStore,
    new SendWelcomeMessageHandler(NotificationFactory.create("email")).handle
  );

  // Controller
  const userController = new UserController(createUserHandler);

  return {
    userRepository,
    userController,
    userCreatedListener,
    eventStore,
  };
}

export function initUserRouter() {
  const { userController, userCreatedListener } = composeUserModule();

  userCreatedListener.listen();
  return new UserRouter(userController);
}
