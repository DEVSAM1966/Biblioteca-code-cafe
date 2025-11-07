import { Router } from 'express';
import { AuthorsController } from '../controllers/authors.controller';
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware';
import { CreateAuthorDto } from '../dtos/in/create-author.dto';

export const AuthorsRoutes = Router();

AuthorsRoutes.get('/id/:id', AuthorsController.getById);

AuthorsRoutes.get('/name/:name', AuthorsController.getByName);

AuthorsRoutes.get('/', AuthorsController.getAll);

AuthorsRoutes.post('/', dtoValidationMiddleware(CreateAuthorDto), AuthorsController.create);

AuthorsRoutes.delete('/id/:id', AuthorsController.delete);
