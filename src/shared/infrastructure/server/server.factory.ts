import { ServerStrategy } from "./server.strategy";
import { ExpressAdapater } from "./express.adapter";
import { FastifyAdapter } from "./fastify.adapter";
import { BadRequestError } from "../../domain/error/BadRequest.error";
export type ServerAdapter = "express" | "fastify";

export class ServerFactory {
  static create(adapter: ServerAdapter): ServerStrategy {
    switch (adapter) {
      case "express":
        return new ExpressAdapater();
      case "fastify":
        return new FastifyAdapter();
      default:
        throw new BadRequestError({
          message: "Invalid server adapter",
          logging: true,
        });
    }
  }
}
