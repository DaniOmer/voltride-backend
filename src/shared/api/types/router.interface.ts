import { ServerStrategy } from "../../server/server.strategy";

export interface BaseRouter {
  registerRoutes(server: ServerStrategy): void;
}
