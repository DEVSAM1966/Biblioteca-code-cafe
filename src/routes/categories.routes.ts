import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import { CategoryIdParamDto } from '../dtos/in/category-id.dto'
import { CategoryNameDto } from '../dtos/in/category-name.dto'
import { CreateCategoryDto } from '../dtos/in/create-category.dto'
import { UpdateCategoryDto } from '../dtos/in/update-category.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'

export const CategoriesRoutes = Router()

CategoriesRoutes.get(
  '/id/:id',
  dtoValidationMiddleware(CategoryIdParamDto, 'params'),
  CategoriesController.getById,
)

CategoriesRoutes.get('/', CategoriesController.getAll)

CategoriesRoutes.get(
  '/name/:name',
  dtoValidationMiddleware(CategoryNameDto, 'params'),
  CategoriesController.getByName,
)

CategoriesRoutes.post('/', dtoValidationMiddleware(CreateCategoryDto), CategoriesController.create)

CategoriesRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(CategoryIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateCategoryDto),
  CategoriesController.update,
)

CategoriesRoutes.delete(
  '/id/:id',
  dtoValidationMiddleware(CategoryIdParamDto, 'params'),
  CategoriesController.delete,
)
