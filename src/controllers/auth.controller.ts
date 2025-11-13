import type { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { success } from '../utilities/success.utility'
import type { RegisterDto } from '../dtos/in/register.dto'
import type { LoginDto } from '../dtos/in/login.dto'

export class AuthController {
  static async register(request: Request, response: Response): Promise<void> {
    const registerInDto = request.body as RegisterDto

    const signDto = await AuthService.register(registerInDto)

    response.status(201).json(success(signDto))
  }

  static async login(request: Request, response: Response): Promise<void> {
    const loginInDto = request.body as LoginDto

    const signDto = await AuthService.login(loginInDto)

    response.status(200).json(success(signDto))
  }
}
