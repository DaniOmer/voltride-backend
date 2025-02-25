import { TokenValidateCommand } from "../../../tokens/application/commands/TokenValidate.command";

export class TokenValidationService {
  constructor(
    private readonly tokenValidateHandler: {
      handle: (command: TokenValidateCommand) => Promise<any>;
    }
  ) {}

  async validateToken(token: string): Promise<void> {
    const command = new TokenValidateCommand(token);
    await this.tokenValidateHandler.handle(command);
  }
}
