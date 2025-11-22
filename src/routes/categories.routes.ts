import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import { CategoryIdParamDto } from '../dtos/in/category-id.dto'
import { CategoryNameDto } from '../dtos/in/category-name.dto'
import { CreateCategoryDto } from '../dtos/in/create-category.dto'
import { UpdateCategoryDto } from '../dtos/in/update-category.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { UserRole } from '@prisma/client'

export const CategoriesRoutes = Router()

CategoriesRoutes.get(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(CategoryIdParamDto, 'params'),
  CategoriesController.getById,
)

CategoriesRoutes.get(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  CategoriesController.getAll,
)

CategoriesRoutes.get(
  '/name/:name', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(CategoryNameDto, 'params'),
  CategoriesController.getByName,
)

CategoriesRoutes.post(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(CreateCategoryDto), 
  CategoriesController.create,
)

CategoriesRoutes.put(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(CategoryIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateCategoryDto),
  CategoriesController.update,
)

CategoriesRoutes.delete(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN]), 
  dtoValidationMiddleware(CategoryIdParamDto, 'params'),
  CategoriesController.delete,
)
