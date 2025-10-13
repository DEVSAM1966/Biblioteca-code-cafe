import { Request } from "express";
import { JWTUser } from "./jwt-user.model";

export interface AuthenticatedRequest extends Request {
  user: JWTUser;
}
