import { Router } from "express";
import { AuthorsController } from "../controllers/authors.controller";

export const AuthorsRoutes = Router();

AuthorsRoutes.get("/id/:id", AuthorsController.getById);

AuthorsRoutes.get("/name/:name", AuthorsController.getByName);
