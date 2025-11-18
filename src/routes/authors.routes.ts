import { Router } from 'express'
import { AuthorsController } from '../controllers/authors.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateAuthorDto } from '../dtos/in/create-author.dto'
import { UpdateAuthorDto } from '../dtos/in/update-author.dto'
import { AuthorIdParamDto } from '../dtos/in/author-id.dto'
import { AuthorNameDto } from '../dtos/in/author-name.dto'

export const AuthorsRoutes = Router()

AuthorsRoutes.get(
  '/id/:id',
  dtoValidationMiddleware(AuthorIdParamDto, 'params'),
  AuthorsController.getById,
)

AuthorsRoutes.get(
  '/name/:name',
  dtoValidationMiddleware(AuthorNameDto, 'params'),
  AuthorsController.getByName,
)

AuthorsRoutes.get('/', AuthorsController.getAll)

AuthorsRoutes.post('/', dtoValidationMiddleware(CreateAuthorDto), AuthorsController.create)

AuthorsRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(AuthorIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateAuthorDto),
  AuthorsController.update,
)

AuthorsRoutes.delete(
  '/id/:id',
  dtoValidationMiddleware(AuthorIdParamDto, 'params'),
  AuthorsController.delete,
)
