import { IEventStore } from "../../../../shared/domain";
import { ServerStrategy } from "../../../../shared/infrastructure";
import { PostgresTokenRepository } from "../repositories/postgres.token.repository";
import {
  UserCreatedListener,
  TokenCreateHandler,
  CreateConfirmationTokenHandler,
  TokenValidateHandler,
} from "../../application";

export function composeTokenModule(
  app: ServerStrategy,
  eventStore: IEventStore
) {
  const tokenRepository = new PostgresTokenRepository();

  // Command Handlers
  const tokenCreateHandler = new TokenCreateHandler(
    eventStore,
    tokenRepository
  );

  const tokenValidateHandler = new TokenValidateHandler(
    eventStore,
    tokenRepository
  );
  const createTokenConfirmationHandler = new CreateConfirmationTokenHandler(
    tokenCreateHandler
  );

  // Event Listeners
  const userCreatedListener = new UserCreatedListener(eventStore, (event) =>
    createTokenConfirmationHandler.handle(event)
  );
  userCreatedListener.listen();

  return {
    tokenValidateHandler,
  };
}
