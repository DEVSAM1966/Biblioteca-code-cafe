import { Router } from "express";
import { BooksController } from "../controllers/books.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";

export const BooksRoutes = Router();

BooksRoutes.get("/isbn/:id", BooksController.getById);

BooksRoutes.get("/title/:name", BooksController.getByName);

BooksRoutes.get("/", BooksController.getAll);
