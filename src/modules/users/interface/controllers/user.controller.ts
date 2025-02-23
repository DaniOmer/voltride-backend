import { UserCreateDTO } from "../dtos/userCreate.dto";
import { UserCreateCommand, UserCreateHandler } from "../../application";
import { ServerRequest, ServerResponse, ApiResponse } from "../../../../shared";

export class UserController {
  constructor(private readonly createUserHandler: UserCreateHandler) {}

  async createUser(req: ServerRequest, res: ServerResponse) {
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
}
