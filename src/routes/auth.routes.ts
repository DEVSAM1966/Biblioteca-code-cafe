import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { LoginDto } from '../dtos/in/login.dto'
import { RegisterDto } from '../dtos/in/register.dto'

export const AuthRoutes = Router()

AuthRoutes.post('/register', dtoValidationMiddleware(RegisterDto), AuthController.register)

AuthRoutes.post('/login', dtoValidationMiddleware(LoginDto), AuthController.login)
