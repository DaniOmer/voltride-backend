import { IEventStore } from "../../../../../shared";
import {
  IToken,
  Token,
  ITokenRepository,
  TokenCreatedEvent,
} from "../../../domain";
import { TokenCreateCommand } from "../../commands/TokenCreate.command";

export class TokenCreateHandler {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly tokenRepository: ITokenRepository
  ) {}

  async handle(command: TokenCreateCommand): Promise<IToken> {
    try {
      if (!command.userUid) {
        throw new Error("User ID is required to create a token");
      }

      if (!command.type) {
        throw new Error("Token type is required");
      }

      const token = await Token.create(
        command.userUid,
        command.type,
        command.expiresIn
      );

      const createdToken = await this.tokenRepository.create(token);
      this.eventStore.publish(new TokenCreatedEvent(createdToken));
      return createdToken;
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  }
}
