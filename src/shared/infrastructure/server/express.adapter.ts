import { Logger } from "winston";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

import { AppConfig } from "../../../config/app.config";
import { LoggerConfig } from "../logger/winston.logger";
import { ServerStrategy, HttpMethod } from "./server.strategy";

export class ExpressAdapater implements ServerStrategy {
  readonly app: Express;
  readonly logger: Logger;

  constructor() {
    this.app = express();
    this.logger = LoggerConfig.get().logger;

    // Register middleware
    this.registerMiddleware(express.json());

    // Configure CORS
    this.registerMiddleware(
      cors({
        origin: AppConfig.client.url || true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.start();
  }

  start(): void {
    try {
      this.app.listen(AppConfig.server.port, () => {
        this.logger.info(
          `Express server is running on port ${AppConfig.server.port}`
        );
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

  registerMiddleware(middleware: any): void {
    this.app.use(middleware);
  }
}
