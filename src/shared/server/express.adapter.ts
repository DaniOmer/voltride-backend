import { Logger } from "winston";
import express, { Express, Request, Response, NextFunction } from "express";

import { AppConfig } from "../../config/app.config";
import { ServerStrategy, HttpMethod } from "./server.strategy";
import { LoggerConfig } from "../logger/winston.logger";

export class ExpressAdapater implements ServerStrategy {
  readonly app: Express;
  readonly logger: Logger;

  constructor() {
    this.app = express();
    this.logger = LoggerConfig.get().logger;
    this.start();
  }

  start(): void {
    try {
      this.app.listen(AppConfig.PORT, () => {
        this.logger.info(`Express server is running on port ${AppConfig.PORT}`);
      });
    } catch (error) {
      this.logger.error("Error starting express server", error);
      process.exit(1);
    }
  }
  stop(): void {
    console.log("Stopping express server...");
    this.logger.info("Stopping express server...");
  }

  registerRoute(method: string, path: string, handler: Function): void {
    const lowerMethod = method.toLowerCase() as HttpMethod;

    this.app[lowerMethod](
      path,
      (req: Request, res: Response, next: NextFunction) => {
        try {
          handler(req, res, next);
        } catch (error) {
          next(error);
        }
      }
    );

    this.logger.info(`Registering ${method.toUpperCase()} route ${path}`);
  }

  registerMiddleware(): void {
    console.log("Registering middlewares...");
    this.logger.info("Registering middlewares...");
    // Add routes and middleware here
  }
}
