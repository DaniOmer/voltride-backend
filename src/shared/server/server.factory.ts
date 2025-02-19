import { ServerStrategy } from "./server.strategy";
import { ExpressAdapater } from "./express.adapter";
import { FastifyAdapter } from "./fastify.adapter";

export type ServerAdapter = "express" | "fastify";

export class ServerFactory {
  static create(adapter: ServerAdapter): ServerStrategy {
    switch (adapter) {
      case "express":
        return new ExpressAdapater();
      case "fastify":
        return new FastifyAdapter();
      default:
        throw new Error("Invalid server adapter");
    }
  }
}
