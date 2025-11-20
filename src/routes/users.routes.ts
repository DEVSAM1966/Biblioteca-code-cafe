import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateUserDto } from '../dtos/in/create-user.dto'
import { UpdateUserDto } from '../dtos/in/update-user.dto'
import { UserIdParamDto } from '../dtos/in/user-id.dto'
import { UserNameDto } from '../dtos/in/user-name.dto'

export const UsersRoutes = Router()

UsersRoutes.get(
  '/id/:id',
  dtoValidationMiddleware(UserIdParamDto, 'params'),
  UsersController.getById,
)

UsersRoutes.get('/', UsersController.getAll)

UsersRoutes.get(
  '/name/:name',
  dtoValidationMiddleware(UserNameDto, 'params'),
  UsersController.getByName,
)

UsersRoutes.delete(
  '/id/:id',
  dtoValidationMiddleware(UserIdParamDto, 'params'),
  UsersController.delete,
)

UsersRoutes.post('/', dtoValidationMiddleware(CreateUserDto), UsersController.create)

UsersRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(UserIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateUserDto),
  UsersController.update,
)

UsersRoutes.delete(
  '/drop/id/:id',
  dtoValidationMiddleware(UserIdParamDto, 'params'),
  UsersController.deleteLogic,
)
