import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { RegisterInDto } from "../dtos/in/register.dto";

export const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  dtoValidationMiddleware(RegisterInDto),
  AuthController.register
);
