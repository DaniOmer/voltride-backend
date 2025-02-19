import { User } from "./user.model";
import { ServerStrategy } from "../../../../shared";
import {
  BaseRouter,
  ServerRequest,
  ServerResponse,
} from "../../../../shared/api/types/router.interface";
import { ApiResponse } from "../../../../shared/api/api.response";

class UserRouter implements BaseRouter {
  registerRoutes(server: ServerStrategy): void {
    server.registerRoute(
      "get",
      "/api/users",
      async (req: ServerRequest, res: ServerResponse) => {
        try {
          const user = await User.create({
            firstName: "John",
            lastName: "Doe",
          });

          ApiResponse.success(res, "User created successfully", { user });
        } catch (error) {
          ApiResponse.error(res, `Error creating user ${error}`, 500);
        }
      }
    );
  }
}

const userRouter = new UserRouter();
export { userRouter };
