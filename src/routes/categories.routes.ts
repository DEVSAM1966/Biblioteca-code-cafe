import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { dtoValidationMiddleware } from '../middlewares/OLD-dto-validation.middleware';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/in/category.dto';

export const CategoriesRoutes = Router();

CategoriesRoutes.get('/id/:id', CategoriesController.getById);

CategoriesRoutes.get('/', CategoriesController.getAll);

CategoriesRoutes.get('/name/:name', CategoriesController.getByName);

CategoriesRoutes.post('/', dtoValidationMiddleware(CreateCategoryDto), CategoriesController.create);

CategoriesRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(UpdateCategoryDto),
  CategoriesController.update,
);

CategoriesRoutes.delete('/id/:id', CategoriesController.delete);
