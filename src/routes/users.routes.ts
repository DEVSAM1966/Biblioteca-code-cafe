import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateUserDto } from '../dtos/in/create-user.dto'
import { UpdateUserDto } from '../dtos/in/update-user.dto'
import { UserIdParamDto } from '../dtos/in/user-id.dto'
import { UserNameDto } from '../dtos/in/user-name.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { UserRole } from '@prisma/client'

export const UsersRoutes = Router()

UsersRoutes.get(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(UserIdParamDto, 'params'),
  UsersController.getById,
)

UsersRoutes.get(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  UsersController.getAll,
)

UsersRoutes.get(
  '/name/:name', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(UserNameDto, 'params'), 
  UsersController.getByName,
)

UsersRoutes.delete(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN]), 
  dtoValidationMiddleware(UserIdParamDto, 'params'), 
  UsersController.delete,
)

UsersRoutes.post(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]),
  dtoValidationMiddleware(CreateUserDto), 
  UsersController.create,
)

UsersRoutes.put(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(UserIdParamDto, 'params'), 
  dtoValidationMiddleware(UpdateUserDto), 
  UsersController.update,
)

UsersRoutes.delete(
  '/drop/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(UserIdParamDto, 'params'), 
  UsersController.deleteLogic,
)
