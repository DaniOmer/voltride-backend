import { TokenType } from "../../../domain";
import { IDomainEvent, BadRequestError } from "../../../../../shared/domain";
import { TokenCreateCommand } from "../../commands/TokenCreate.command";
import { TokenCreateHandler } from "../command-handlers/TokenCreate.handler";
import { UserCreatedEventPayload } from "../../listeners/UserCreated.listener";

export class CreateConfirmationTokenHandler {
  constructor(private readonly tokenCreateHandler: TokenCreateHandler) {}

  async handle(event: IDomainEvent<UserCreatedEventPayload>) {
    try {
      if (!event.payload || !event.payload.uid) {
        throw new BadRequestError({
          message: "Invalid user payload",
          code: 400,
          logging: true,
        });
      }

      const command = new TokenCreateCommand(
        event.payload.uid,
        event.payload.email,
        TokenType.Confirmation
      );

      await this.tokenCreateHandler.handle(command);
    } catch (error) {
      console.error("Error creating confirmation token:", {
        error,
        eventName: event.name,
        userId: event.payload?.uid,
      });
      throw error;
    }
  }
}
