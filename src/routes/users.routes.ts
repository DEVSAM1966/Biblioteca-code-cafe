import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateUserDto } from '../dtos/in/create-user.dto'
import { UpdateUserDto } from '../dtos/in/update-user.dto'

export const UsersRoutes = Router()

UsersRoutes.get('/id/:id', UsersController.getById)

UsersRoutes.get('/', UsersController.getAll)

UsersRoutes.get('/name/:name', UsersController.getByName)

UsersRoutes.delete('/id/:id', UsersController.delete)

UsersRoutes.post('/', dtoValidationMiddleware(CreateUserDto), UsersController.create)

UsersRoutes.put('/id/:id', dtoValidationMiddleware(UpdateUserDto), UsersController.update)

UsersRoutes.delete('/drop/id/:id', UsersController.deleteLogic)
