import { Logger } from "winston";

import { ServerStrategy } from "./server.strategy";
import { LoggerConfig } from "../logger/winston.logger";

export class FastifyAdapter implements ServerStrategy {
  readonly logger: Logger;

  constructor() {
    this.logger = LoggerConfig.get().logger;
  }

  start(): void {
    console.log("Starting fastify server...");
    this.logger.info("Starting fastify server...");
  }

  stop(): void {
    console.log("Stopping fastify server...");
    this.logger.info("Stopping fastify server...");
  }

  registerRoute(method: string, path: string, handler: Function): void {
    this.logger.info("Registering api routes and middlewares...");
  }

  registerMiddleware(): void {
    console.log("Registering middleware...");
    this.logger.info("Registering middleware...");
  }
}
