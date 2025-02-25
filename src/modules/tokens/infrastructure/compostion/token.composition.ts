import { IEventStore, ServerStrategy } from "../../../../shared";
import { PostgresTokenRepository } from "../repositories/postgres.token.repository";
import {
  UserCreatedListener,
  TokenCreateHandler,
  CreateConfirmationTokenHandler,
} from "../../application";

export function composeTokenModule(
  app: ServerStrategy,
  eventStore: IEventStore
) {
  const tokenRepository = new PostgresTokenRepository();

  // Event Handlers
  const tokenCreateHandler = new TokenCreateHandler(
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
}
