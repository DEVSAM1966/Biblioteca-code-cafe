import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

export const UsersRoutes = Router();

UsersRoutes.get("/id/:id", UsersController.getById);

UsersRoutes.get("/", UsersController.getAll);

UsersRoutes.get("/name/:name", UsersController.getByName);

UsersRoutes.delete("/id/:id", UsersController.delete);

UsersRoutes.post("/", UsersController.create);

UsersRoutes.put("/id/:id", UsersController.update);
