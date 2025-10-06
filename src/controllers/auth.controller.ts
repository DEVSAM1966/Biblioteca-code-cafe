import { Request, Response } from "express";
import { RegisterInDto } from "../dtos/in/register.dto";
import { AuthService } from "../services/auth.service";
import { success } from "../utilities/success.utility";

export class AuthController {
  static async register(request: Request, response: Response): Promise<void> {
    const registerInDto = request.body as RegisterInDto;

    const registerData = await AuthService.register(registerInDto);

    response.status(201).json(success(registerData));
  }
}
