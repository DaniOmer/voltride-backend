import { Request, Response } from "express";
import { ServerStrategy } from "../../server/server.strategy";
import { FastifyReply, FastifyRequest } from "fastify";

export type ServerRequest = Request | FastifyRequest;
export type ServerResponse = Response | FastifyReply;

export interface BaseRouter {
  registerRoutes(server: ServerStrategy): void;
}
