import { UserCreateDTO, EmailValidationDTO } from "../dtos/userCreate.dto";
import {
  UserCreateCommand,
  UserCreateHandler,
  UserValidateEmailHandler,
} from "../../application";
import { UserValidateEmailCommand } from "../../domain/commands/UserValidateEmail.command";
import {
  ServerRequest,
  ServerResponse,
  ApiResponse,
} from "../../../../shared/infrastructure";

export class UserController {
  constructor(
    private readonly createUserHandler: UserCreateHandler,
    private readonly validateEmailHandler: UserValidateEmailHandler
  ) {}

  async createUser(req: ServerRequest, res: ServerResponse): Promise<void> {
    const dto: UserCreateDTO = req.body;

    const command = new UserCreateCommand(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.password,
      dto.phoneNumber,
      dto.address
    );

    try {
      const user = await this.createUserHandler.execute(command);
      ApiResponse.success(res, "User created successfully", { user });
    } catch (error: any) {
      ApiResponse.error(res, error.message, 500);
    }
  }

  async validateEmail(req: ServerRequest, res: ServerResponse): Promise<void> {
    const { token }: EmailValidationDTO = req.body;

    try {
      const command = new UserValidateEmailCommand(token);
      await this.validateEmailHandler.execute(command);
      ApiResponse.success(res, "Email validated successfully");
    } catch (error: any) {
      ApiResponse.error(res, error.message, 400);
    }
  }
}
