import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import { CreateCategoryDto } from '../dtos/in/create-category.dto'
import { UpdateCategoryDto } from '../dtos/in/update-category.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'

export const CategoriesRoutes = Router()

CategoriesRoutes.get('/id/:id', CategoriesController.getById)

CategoriesRoutes.get('/', CategoriesController.getAll)

CategoriesRoutes.get('/name/:name', CategoriesController.getByName)

CategoriesRoutes.post('/', dtoValidationMiddleware(CreateCategoryDto), CategoriesController.create)

CategoriesRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(UpdateCategoryDto),
  CategoriesController.update,
)

CategoriesRoutes.delete('/id/:id', CategoriesController.delete)
