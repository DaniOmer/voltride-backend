import mongoose from "mongoose";

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
        const userSchema = new mongoose.Schema({
          name: String,
          email: String,
          password: String,
        });
        const User = mongoose.model("User", userSchema);
        new User({
          name: "John Doe",
          email: "wLQ6w@example.com",
          password: "password",
        }).save();

        const users = await User.find({});
        console.log(users);

        ApiResponse.success(res, "Users fetched successfully", { users });
      }
    );
  }
}

const userRouter = new UserRouter();
export { userRouter };
