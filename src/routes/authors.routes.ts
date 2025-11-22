import { Router } from 'express'
import { AuthorsController } from '../controllers/authors.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateAuthorDto } from '../dtos/in/create-author.dto'
import { UpdateAuthorDto } from '../dtos/in/update-author.dto'
import { AuthorIdParamDto } from '../dtos/in/author-id.dto'
import { AuthorNameDto } from '../dtos/in/author-name.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { UserRole } from '@prisma/client'

export const AuthorsRoutes = Router()

AuthorsRoutes.get(
  '/id/:id',
  authMiddleware(),
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]),
  dtoValidationMiddleware(AuthorIdParamDto, 'params'),
  AuthorsController.getById,
)

AuthorsRoutes.get(
  '/name/:name',
  authMiddleware(),
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]),
  dtoValidationMiddleware(AuthorNameDto, 'params'),
  AuthorsController.getByName,
)

AuthorsRoutes.get(
  '/', 
  authMiddleware(),
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]),
  AuthorsController.getAll,
)

AuthorsRoutes.post(
  '/', 
  authMiddleware(),
  authorize([UserRole.ADMIN, UserRole.SUPPORT]),
  dtoValidationMiddleware(CreateAuthorDto), 
  AuthorsController.create,
)

AuthorsRoutes.put(
  '/id/:id',
  authMiddleware(),
  authorize([UserRole.ADMIN, UserRole.SUPPORT]),
  dtoValidationMiddleware(AuthorIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateAuthorDto),
  AuthorsController.update,
)

AuthorsRoutes.delete(
  '/id/:id',
  authMiddleware(),
  authorize([UserRole.ADMIN]),
  dtoValidationMiddleware(AuthorIdParamDto, 'params'),
  AuthorsController.delete,
)
