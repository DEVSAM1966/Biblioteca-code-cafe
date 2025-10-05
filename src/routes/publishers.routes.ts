import { Router } from "express";
import { PublishersController } from "../controllers/publishers.controller";
import { dtoValidationMiddleware } from "../middlewares/dto-validation.middleware";
import { CreatePublisherDto } from "../dtos/in/publisher.dto";

export const PublishersRoutes = Router();

PublishersRoutes.get("/id/:id", PublishersController.getById);

PublishersRoutes.get("/name/:name", PublishersController.getByName);

PublishersRoutes.get("/", PublishersController.getAll);

PublishersRoutes.post("/", dtoValidationMiddleware(CreatePublisherDto), PublishersController.create);
