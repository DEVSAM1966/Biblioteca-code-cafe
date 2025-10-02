import { Router } from "express";
import { PublishersController } from "../controllers/publishers.controller";

export const PublishersRoutes = Router();

PublishersRoutes.get("/id/:id", PublishersController.getById);

PublishersRoutes.get("/name/:name", PublishersController.getByName);
PublishersRoutes.get("/name", PublishersController.getByName);

PublishersRoutes.get("/", PublishersController.getAll);