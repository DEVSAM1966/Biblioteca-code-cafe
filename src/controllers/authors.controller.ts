import type { Request, Response } from 'express'
import { BadRequestError } from '../models/errors/bad-request.error'
import { AuthorsService } from '../services/authors.service'
import { success } from '../utilities/success.utility'
import type { CreateAuthorDto } from '../dtos/in/create-author.dto'

export class AuthorsController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const authorId = parseInt(id, 10)

    if (Number.isNaN(authorId) || authorId <= 0) {
      throw new BadRequestError('Invalid ID')
    }

    const authorDto = await AuthorsService.getById(authorId)

    response.status(200).json(success(authorDto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params

    if (!name || name.trim().length === 0) {
      throw new BadRequestError('Name is missing')
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      throw new BadRequestError('Name can only contain characters and spaces')
    }

    const authorDto = await AuthorsService.getByName(name)

    response.status(200).json(success(authorDto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const authorsDto = await AuthorsService.getAll()

    response.status(200).json(success(authorsDto))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createAuthorDto: CreateAuthorDto = request.body

    const authorDto = await AuthorsService.create(createAuthorDto)

    response.status(201).json(success(authorDto))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params

    if (typeof id !== 'string' || id.trim().length === 0) {
      throw new BadRequestError('Id is missing')
    }

    if (!/^\d+$/.test(id)) {
      throw new BadRequestError('Id can only contain number')
    }

    const idAsNumber = parseInt(id, 10)

    const existing = await AuthorsService.delete(idAsNumber)

    response.status(200).json(success(existing))
  }
}
