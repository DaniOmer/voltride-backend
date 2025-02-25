import { BadRequestError } from "../../../../../shared/domain";
import { UserValidateEmailCommand } from "../../../domain/commands/UserValidateEmail.command";

export class UserValidateEmailHandler {
  constructor(
    private readonly validateTokenFn: (token: string) => Promise<void>
  ) {}

  async execute(command: UserValidateEmailCommand): Promise<void> {
    try {
      if (!command.token) {
        throw new BadRequestError({
          message: "Token is required",
          logging: true,
        });
      }

      await this.validateTokenFn(command.token);
    } catch (error) {
      console.error("Error validating email:", error);
      throw error;
    }
  }
}
