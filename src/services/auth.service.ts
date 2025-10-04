import { JWT_SECRET, SALT_ROUNDS } from "../configuration/env.configuration";
import { RegisterInDto } from "../dtos/in/register.dto";
import { ConflictError } from "../models/errors/conflict.error";
import { UsersRepository } from "../repositories/users.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static getAuthorization(userId: number) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  }

  static async hash(value: string) {
    return await bcrypt.hash(value, SALT_ROUNDS);
  }

  static async register(data: RegisterInDto) {
    const isEmailRegistered = await UsersRepository.exists({ email: data.email });

    if (isEmailRegistered) {
      throw new ConflictError(`Email ${data.email} is already registered`);
    }

    const isDniRegistered = await UsersRepository.exists({ dni: data.dni });

    if (isDniRegistered) {
      throw new ConflictError(`DNI ${data.dni} is already registered`);
    }

    const isPhoneRegistered = await UsersRepository.exists({ phone: data.phone });

    if (isPhoneRegistered) {
      throw new ConflictError(`Phone ${data.phone} is already registered`);
    }

    const hashedPassword = await this.hash(data.password);
    const user = await UsersRepository.create({
      address: data.address,
      city: data.city,
      country: data.country,
      dni: data.dni,
      password: hashedPassword,
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      postal_code: data.postal_code,
      province: data.province,
    });
    
    const authorization = this.getAuthorization(user.user_id);

    return { user, authorization };
  }
}
