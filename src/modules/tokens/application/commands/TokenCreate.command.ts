import { AppConfig } from "../../../../config/app.config";
import { TokenType } from "../../domain";

export class TokenCreateCommand {
  constructor(
    public readonly userUid: string,
    public readonly email: string,
    public readonly type: TokenType,
    public readonly expiresIn: number = Number(AppConfig.token.defaultExpiresIn)
  ) {}
}
