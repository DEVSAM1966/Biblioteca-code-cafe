import { JWT_SECRET, SALT_ROUNDS } from "../configuration/env.configuration";
import { RegisterInDto } from "../dtos/in/register.dto";
import { UserOutDTO } from "../dtos/out/user.dto";
import { ConflictError } from "../models/errors/conflict.error";
import { UsersRepository } from "../repositories/users.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static getAuthorization(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  }

  static async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, SALT_ROUNDS);
  }

  static async register(data: RegisterInDto) {
    const emailExists = await UsersRepository.existsBy("email", data.email);

    if (emailExists) throw new ConflictError(`Email ${data.email} is already registered`);
    
    const dniExists = await UsersRepository.existsBy("dni", data.dni);

    if (dniExists) throw new ConflictError(`DNI ${data.dni} is already registered`);

    const phoneExists = await UsersRepository.existsBy("phone", data.phone);

    if (phoneExists) throw new ConflictError(`Phone ${data.phone} is already registered`);

    const hashedPassword = await this.hash(data.password);
    const newUser = await UsersRepository.create({
      address: data.address,
      city: data.city,
      country: data.country,
      dni: data.dni,
      password: hashedPassword,
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      postalCode: data.postalCode,
      province: data.province,
    });

    const userOutDto: UserOutDTO = {
      fullname: newUser.fullname,
      registrationDate: newUser.registrationDate.toISOString(),
      role: newUser.role,
      userId: newUser.userId,
    };

    const authorization = this.getAuthorization(newUser.userId);

    return { user: userOutDto, authorization };
  }
}
