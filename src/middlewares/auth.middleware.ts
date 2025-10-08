import { Response, Request, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "../configuration/env.configuration";
import { UnauthorizedError } from "../models/errors/unauthorized.error";
import { JWTUser } from "../models/jwt-user.model";

export function authMiddleware() {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) throw new UnauthorizedError("No token provided");

    const token = authorizationHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as JWTUser;

      request.user = { id: decodedToken.id, role: decodedToken.role };

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("Token expired");
      }

      throw new UnauthorizedError("Invalid token");
    }
  };
}
