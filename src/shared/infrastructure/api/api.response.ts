import { Response } from "express";
import { FastifyReply } from "fastify";

import { ServerResponse } from "./types/router.interface";

export class ApiResponse {
  static success(
    res: ServerResponse,
    message: string,
    data: any = {},
    status = 200
  ): void {
    if (ApiResponse.isFastifyReply(res)) {
      (res as FastifyReply).status(status).send({
        success: true,
        message,
        data,
      });
    } else {
      (res as Response).status(status).json({
        success: true,
        message,
        data,
      });
    }
  }

  static successWithToken(
    res: ServerResponse,
    message: string,
    data: any,
    token: string,
    status = 200
  ): void {
    if (ApiResponse.isFastifyReply(res)) {
      (res as FastifyReply).status(status).send({
        success: true,
        message,
        token,
        data,
      });
    } else {
      (res as Response).status(status).json({
        success: true,
        message,
        token,
        data,
      });
    }
  }

  static error(
    res: ServerResponse,
    message: string,
    code = 400,
    details: any = null
  ): void {
    if (ApiResponse.isFastifyReply(res)) {
      (res as FastifyReply).status(code).send({
        success: false,
        message,
        error: {
          code,
          details,
        },
      });
    } else {
      (res as Response).status(code).json({
        success: false,
        message,
        error: {
          code,
          details,
        },
      });
    }
  }

  private static isFastifyReply(res: ServerResponse): res is FastifyReply {
    return typeof (res as FastifyReply).send === "function";
  }
}
