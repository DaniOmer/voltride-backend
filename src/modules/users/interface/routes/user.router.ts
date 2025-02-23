import { User } from "../../domain";
import { UserController } from "../controllers/user.controller";
import { UserCreateHandler } from "../../application";
import { PostgresUserRepository } from "../../data-access/repositories/postgres.repository";

import { ServerStrategy } from "../../../../shared";
import { BaseRouter, ServerRequest, ServerResponse } from "../../../../shared";

class UserRouter implements BaseRouter {
  private readonly createUserHandler: UserCreateHandler;
  private readonly controller: UserController;
  private readonly repository: PostgresUserRepository;

  constructor() {
    this.repository = new PostgresUserRepository();
    this.createUserHandler = new UserCreateHandler(this.repository);
    this.controller = new UserController(this.createUserHandler);
  }

  registerRoutes(server: ServerStrategy): void {
    server.registerRoute(
      "post",
      "/api/users",
      async (req: ServerRequest, res: ServerResponse) => {
        await this.controller.createUser.bind(this.controller)(req, res);
      }
    );
  }
}

const userRouter = new UserRouter();
export { userRouter };
