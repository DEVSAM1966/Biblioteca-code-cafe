import type { Request, Response } from 'express'
import { success } from '../utilities/success.utility'
import { UsersService } from '../services/users.service'
import type { CreateUserDto } from '../dtos/in/create-user.dto'
import type { UpdateUserDto } from '../dtos/in/update-user.dto'
import type { UserIdParamDto } from '../dtos/in/user-id.dto'
import type { UserNameDto } from '../dtos/in/user-name.dto'

export class UsersController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as UserIdParamDto

    const userOutDto = await UsersService.getById(id)

    response.status(200).json(success(userOutDto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const usersOutDto = await UsersService.getAll()

    response.status(200).json(success(usersOutDto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params as unknown as UserNameDto

    const userOutDto = await UsersService.getByName(name)

    response.status(200).json(success(userOutDto))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as UserIdParamDto

    const existing = await UsersService.delete(id)

    response.status(200).json(success(existing))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createUserDto = request.body as CreateUserDto

    const userOutDto = await UsersService.create(createUserDto)

    response.status(201).json(success(userOutDto))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as UserIdParamDto

    const updateUserDto = request.body as UpdateUserDto

    const userOutDto = await UsersService.update(id, updateUserDto)

    response.status(200).json(success(userOutDto))
  }

  static async deleteLogic(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as UserIdParamDto

    const userDrop = await UsersService.deleteLogic(id)

    response.status(200).json(success(userDrop))
  }
}
