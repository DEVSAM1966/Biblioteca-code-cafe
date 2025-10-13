import { UnauthorizedError } from "../models/errors/unauthorized.error";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { getTokenFrom } from "../utilities/get-token-from.utility";
import { Response, Request, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export function authMiddleware() {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const token = getTokenFrom(request);

    if (!token) throw new UnauthorizedError("No token provided");

    try {
      const payload = AuthService.getPayloadOf(token);

      request.user = { id: payload.sub, role: payload.role };

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("Token expired");
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError("Malformed token");
      }

      throw new UnauthorizedError("Invalid token");
    }
  };
}
