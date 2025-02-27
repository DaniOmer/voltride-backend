import crypto from "crypto";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppConfig } from "../../config/app.config";
import { BadRequestError } from "../domain/error/BadRequest.error";

export type UserDataToJWT = {
  _id: string;
  roles: { name: string }[];
};

export class SecurityUtils {
  static generateSecret(): string {
    return crypto.randomBytes(32).toString("base64");
  }

  static getJWTSecret(): string {
    const secret = AppConfig.jwt.secret;
    if (!secret) {
      throw new BadRequestError({
        code: 500,
        message: "Missing JWT secret",
        logging: true,
      });
    }
    return secret;
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(
    inputPassword: string,
    storedPasswordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPasswordHash);
  }

  static async generateJWTToken(userDataToJWT: UserDataToJWT): Promise<string> {
    const secret = this.getJWTSecret() as string;
    return jwt.sign(userDataToJWT, secret, {
      algorithm: "HS256",
      expiresIn: AppConfig.jwt.expiresIn,
    });
  }

  static async verifyJWTToken(token: string): Promise<string | JwtPayload> {
    const secret = this.getJWTSecret();
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decode) => {
        if (error) {
          throw new BadRequestError({
            code: 401,
            message: "Invalid JWT token",
            logging: true,
          });
        } else {
          resolve(decode as string | JwtPayload);
        }
      });
    });
  }

  static async generateRandomToken(): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = this.hashPassword(token);
    return hashedToken;
  }

  static validateToken(
    inputToken: string,
    storedToken: string
  ): Promise<boolean> {
    return this.comparePassword(inputToken, storedToken);
  }

  static isOwnerOrAdmin(
    resourceUserId: string,
    currentUser: UserDataToJWT
  ): boolean {
    const isOwner = resourceUserId === currentUser._id;
    const isAdmin = currentUser.roles.some((role) => role.name === "admin");

    return isOwner || isAdmin;
  }
}
