import { NotFoundError } from '../models/errors/not-found.error'
import { ConflictError } from '../models/errors/conflict.error'
import { UsersRepository } from '../repositories/users.repository'
import { InternalServerError } from '../models/errors/internal-server.error'
import type { CreateUserDto } from '../dtos/in/create-user.dto'
import type { User } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { UpdateUserDto } from '../dtos/in/update-user.dto'
import { DetailedUserDto } from '../dtos/out/detailed-user.dto'
import type { UserDto } from '../dtos/out/user.dto'
import { plainToInstance } from 'class-transformer'

export class UsersService {
  static async getById(id: number): Promise<DetailedUserDto> {
    const user = await UsersRepository.getById(id)

    if (!user) {
      throw new NotFoundError(`User with ${id} not found`)
    }

    return {
      fullname: user.fullname,
      dni: user.dni,
      address: user.address,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone,
      email: user.email,
      registrationDate: user.registrationDate.toISOString(),
      userDrop: user.userDrop,
      daysDisciplinary: user.daysDisciplinary,
      role: user.role,
      userId: user.userId,
    }
  }

  static async getAll(): Promise<UserDto[]> {
    const users = await UsersRepository.getAll()

    if (!users || users.length === 0) {
      throw new NotFoundError(`There are not records in Users`)
    }

    return users.map((user) => ({
      fullname: user.fullname,
      registrationDate: user.registrationDate.toISOString(),
      userDrop: user.userDrop,
      role: user.role,
      userId: user.userId,
    }))
  }

  static async getByName(name: string): Promise<DetailedUserDto[]> {
    const users = await UsersRepository.getByName(name)

    if (!users || users.length === 0) {
      throw new NotFoundError(`No user found with name: ${name}`)
    }

    return users.map((user) => ({
      fullname: user.fullname,
      dni: user.dni,
      address: user.address,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone,
      email: user.email,
      registrationDate: user.registrationDate.toISOString(),
      userDrop: user.userDrop,
      daysDisciplinary: user.daysDisciplinary,
      role: user.role,
      userId: user.userId,
    }))
  }

  static async delete(id: number): Promise<boolean> {
    try {
      await UsersRepository.delete(id)

      return true
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundError(`User with ${id} not found`)
          case 'P2003':
            throw new ConflictError(`Cannot delete user with ${id} due to existing related records`)
        }
      }
      throw new InternalServerError(`Failed to delete user, ${error.message}`)
    }
  }

  static async create(data: CreateUserDto): Promise<DetailedUserDto> {
    try {
      const newUser: User = await UsersRepository.create(data)

      const dto = plainToInstance(DetailedUserDto, {
        fullname: newUser.fullname,
        dni: newUser.dni,
        address: newUser.address,
        city: newUser.city,
        province: newUser.province,
        postalCode: newUser.postalCode,
        country: newUser.country,
        phone: newUser.phone,
        email: newUser.email,
        registrationDate: newUser.registrationDate.toISOString(),
        userDrop: newUser.userDrop,
        daysDisciplinary: newUser.daysDisciplinary,
        role: newUser.role,
        userId: newUser.userId,
      })

      return dto
    } catch (error: any) {
      console.error('Create user error message:', error.message)

      throw new InternalServerError(
        'Failed to create user or Invalid credentials user, ${error.message)',
      )
    }
  }

  static async update(id: number, data: UpdateUserDto): Promise<DetailedUserDto> {
    const existing = await UsersRepository.getById(id)

    if (!existing) {
      throw new NotFoundError(`User with ${id} not found`)
    }

    try {
      const updatedUser: User = await UsersRepository.update(id, data)

      const dto = plainToInstance(DetailedUserDto, {
        fullname: updatedUser.fullname,
        dni: updatedUser.dni,
        address: updatedUser.address,
        city: updatedUser.city,
        province: updatedUser.province,
        postalCode: updatedUser.postalCode,
        country: updatedUser.country,
        phone: updatedUser.phone,
        email: updatedUser.email,
        registrationDate: updatedUser.registrationDate.toISOString(),
        userDrop: updatedUser.userDrop,
        daysDisciplinary: updatedUser.daysDisciplinary,
        role: updatedUser.role,
        userId: updatedUser.userId,
      })

      return dto
    } catch (error: any) {
      console.error('Create user error raw:', error)
      throw new InternalServerError(`Failed to update user, ${error.message}`)
    }
  }

  static async deleteLogic(id: number): Promise<boolean> {
    const existing = await UsersRepository.getById(id)

    if (!existing) {
      throw new NotFoundError(`User with ${id} not found`)
    }

    if (existing.userDrop) {
      throw new ConflictError(`User with ${id} is already marked as deleted`)
    }

    try {
      await UsersRepository.deleteLogic(id)

      return true
    } catch (error: any) {
      throw new InternalServerError(`Failed to logical delete user, ${error.message}`)
    }
  }
}
