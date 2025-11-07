import { Request, Response } from 'express';
import { RegisterInDto } from '../dtos/in/register.dto';
import { AuthService } from '../services/auth.service';
import { success } from '../utilities/success.utility';
import { LoginInDto } from '../dtos/in/login.dto';

export class AuthController {
  static async register(request: Request, response: Response): Promise<void> {
    const registerInDto = request.body as RegisterInDto;

    const registerData = await AuthService.register(registerInDto);

    response.status(201).json(success(registerData));
  }

  static async login(request: Request, response: Response): Promise<void> {
    const loginInDto = request.body as LoginInDto;

    const loginData = await AuthService.login(loginInDto);

    response.status(200).json(success(loginData));
  }
}
