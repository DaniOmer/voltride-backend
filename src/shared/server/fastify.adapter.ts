import { Logger } from "winston";
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { ServerStrategy, HttpMethod } from "./server.strategy";
import { LoggerConfig } from "../logger/winston.logger";
import { AppConfig } from "../../config/app.config";

export class FastifyAdapter implements ServerStrategy {
  readonly logger: Logger;
  readonly app: FastifyInstance;

  constructor() {
    this.app = fastify();
    this.logger = LoggerConfig.get().logger;
    this.start();
  }

  start(): void {
    this.app.listen(
      { port: AppConfig.server.port as number },
      (err, address) => {
        if (err) {
          this.logger.error("Error starting fastify server", err);
          process.exit(1);
        }
        this.logger.info(`Fastify server is running on ${address}`);
      }
    );
  }

  stop(): void {
    console.log("Stopping fastify server...");
    this.logger.info("Stopping fastify server...");
  }

  registerRoute(method: string, path: string, handler: Function): void {
    const lowerMethod = method.toLowerCase() as HttpMethod;

    this.app.route({
      method: lowerMethod,
      url: path,
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await handler(request, reply);
        } catch (error) {
          reply.status(500).send({ error: "Internal Server Error" });
        }
      },
    });

    this.logger.info(`Registered route: [${method.toUpperCase()}] ${path}`);
  }

  registerMiddleware(): void {
    console.log("Registering middleware...");
    this.logger.info("Registering middleware...");
  }
}
