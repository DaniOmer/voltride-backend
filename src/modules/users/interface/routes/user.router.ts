import { ServerStrategy } from "../../../../shared";
import { BaseRouter } from "../../../../shared/api/types/router.interface";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../../../shared/api/api.response";

class UserRouter implements BaseRouter {
  constructor() {}

  registerRoutes(server: ServerStrategy): void {
    server.registerRoute(
      "get",
      "/api/users",
      async (req: Request, res: Response, next: NextFunction) => {
        ApiResponse.success(res, "Users fetched successfully", { users: [] });
      }
    );
  }
}

const userRouter = new UserRouter();
export { userRouter };
