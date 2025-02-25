import { IEventStore, BadRequestError } from "../../../../../shared/domain";
import { IToken, ITokenRepository, TokenValidatedEvent } from "../../../domain";
import { TokenValidateCommand } from "../../commands/TokenValidate.command";
import { Token, TokenStatus } from "../../../domain/entity/token.entity";

export class TokenValidateHandler {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly tokenRepository: ITokenRepository
  ) {}

  async handle(command: TokenValidateCommand): Promise<IToken> {
    try {
      if (!command.hash) {
        throw new BadRequestError({
          message: "Token hash is required",
          logging: true,
        });
      }

      const token = await this.tokenRepository.findByHash(command.hash);

      if (!token) {
        throw new BadRequestError({
          message: "Token not found",
          logging: true,
        });
      }

      const tokenEntity = new Token(token);

      if (tokenEntity.isExpired()) {
        tokenEntity.markAsExpired();
        await this.tokenRepository.update(tokenEntity);
        throw new BadRequestError({
          message: "Token has expired",
          logging: true,
        });
      }

      if (tokenEntity.status !== TokenStatus.Pending) {
        throw new BadRequestError({
          message: "Token is already used or expired",
          logging: true,
        });
      }

      tokenEntity.markAsUsed();
      const updatedToken = await this.tokenRepository.update(tokenEntity);

      this.eventStore.publish(
        new TokenValidatedEvent({
          uid: updatedToken.uid,
          userUid: updatedToken.userUid,
          email: updatedToken.email,
          type: updatedToken.type,
        })
      );

      return updatedToken;
    } catch (error) {
      console.error("Error validating token:", error);
      throw error;
    }
  }
}
