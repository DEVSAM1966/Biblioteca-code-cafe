import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";

export const CategoriesRoutes = Router();

CategoriesRoutes.get("/id/:id", CategoriesController.getById);

CategoriesRoutes.get("/", CategoriesController.getAll);
