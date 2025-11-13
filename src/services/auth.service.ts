import type { User } from '@prisma/client'
import { BadRequestError } from '../models/errors/bad-request.error'
import { ConflictError } from '../models/errors/conflict.error'
import { NotFoundError } from '../models/errors/not-found.error'
import { UsersRepository } from '../repositories/users.repository'
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { AuthorizationTokenPayload } from '../models/authorization-token-payload.model'
import { UnauthorizedError } from '../models/errors/unauthorized.error'
import type { RegisterDto } from '../dtos/in/register.dto'
import type { UserDto } from '../dtos/out/user.dto'
import type { LoginDto } from '../dtos/in/login.dto'
import type { SignDto } from '../dtos/out/sign.dto'
import { environment } from '../configuration/environment.configuration'

export class AuthService {
  static getAuthorization(user: User): string {
    const expiresIn = '1h'
    const payload = { sub: user.userId, role: user.role }

    return jwt.sign(payload, environment.jwt.secret, { expiresIn })
  }

  static getPayloadOf(token: string): AuthorizationTokenPayload {
    const payload = jwt.verify(token, environment.jwt.secret) as AuthorizationTokenPayload

    return payload
  }

  static async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, environment.jwt.saltRounds)
  }

  static async register(data: RegisterDto): Promise<SignDto> {
    const emailExists = await UsersRepository.existsBy('email', data.email)

    if (emailExists) throw new ConflictError(`Email ${data.email} is already registered`)

    const dniExists = await UsersRepository.existsBy('dni', data.dni)

    if (dniExists) throw new ConflictError(`DNI ${data.dni} is already registered`)

    const phoneExists = await UsersRepository.existsBy('phone', data.phone)

    if (phoneExists) throw new ConflictError(`Phone ${data.phone} is already registered`)

    const hashedPassword = await AuthService.hash(data.password)
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
    })

    const userDto: UserDto = {
      fullname: newUser.fullname,
      registrationDate: newUser.registrationDate.toISOString(),
      role: newUser.role,
      userId: newUser.userId,
      userDrop: newUser.userDrop,
    }

    const authorization = AuthService.getAuthorization(newUser)

    return { user: userDto, authorization }
  }

  static async login(data: LoginDto): Promise<SignDto> {
    const user = await UsersRepository.getByEmail(data.email)

    if (!user) throw new NotFoundError('User not found')

    if (user.userDrop) throw new UnauthorizedError('User is inactive')

    const passwordsMatches = await compare(data.password, user.password)

    if (!passwordsMatches) throw new BadRequestError('Invalid credentials')

    const authorization = AuthService.getAuthorization(user)
    const userDto: UserDto = {
      fullname: user.fullname,
      registrationDate: user.registrationDate.toISOString(),
      role: user.role,
      userId: user.userId,
      userDrop: user.userDrop,
    }

    return { user: userDto, authorization }
  }
}
