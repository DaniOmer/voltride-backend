import { IEventStore, BadRequestError } from "../../../../../shared/domain";
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
        throw new BadRequestError({
          message: "User ID is required",
          logging: true,
        });
      }

      if (!command.type) {
        throw new BadRequestError({
          message: "Token type is required",
          logging: true,
        });
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
