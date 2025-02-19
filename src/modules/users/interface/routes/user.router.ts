import { ServerStrategy } from "../../../../shared";
import {
  BaseRouter,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/api/types/router.interface";
import { ApiResponse } from "../../../../shared/api/api.response";

class UserRouter implements BaseRouter {
  constructor() {}

  registerRoutes(server: ServerStrategy): void {
    server.registerRoute(
      "get",
      "/api/users",
      async (req: ServerRequest, res: ServerResponse) => {
        ApiResponse.success(res, "Users fetched successfully", { users: [] });
      }
    );
  }
}

const userRouter = new UserRouter();
export { userRouter };
