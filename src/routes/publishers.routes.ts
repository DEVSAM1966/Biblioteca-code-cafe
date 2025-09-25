import { Router } from "express";
import { PublishersController } from "../controllers/publishers.controller";

export const PublishersRoutes = Router();

PublishersRoutes.get("/:id", PublishersController.getById);