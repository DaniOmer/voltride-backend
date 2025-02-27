import {
  BaseRouter,
  ServerStrategy,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/infrastructure";
import { UserController } from "../controllers/user.controller";

export class UserRouter implements BaseRouter {
  constructor(private readonly controller: UserController) {}

  registerRoutes(server: ServerStrategy): void {
    server.registerRoute(
      "post",
      "/api/users",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.createUser(req, res)
    );

    server.registerRoute(
      "post",
      "/api/users/validate-email",
      (req: ServerRequest, res: ServerResponse) =>
        this.controller.validateEmail(req, res)
    );
  }
}
