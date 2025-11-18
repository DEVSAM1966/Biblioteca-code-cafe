import type { Request, Response } from 'express'
import { AuthorsService } from '../services/authors.service'
import { success } from '../utilities/success.utility'
import type { CreateAuthorDto } from '../dtos/in/create-author.dto'
import type { UpdateAuthorDto } from '../dtos/in/update-author.dto'
import type { AuthorIdParamDto } from '../dtos/in/author-id.dto'
import type { AuthorNameDto } from '../dtos/in/author-name.dto'

export class AuthorsController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as AuthorIdParamDto

    const authorDto = await AuthorsService.getById(id)

    response.status(200).json(success(authorDto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params as unknown as AuthorNameDto

    const authorDto = await AuthorsService.getByName(name)

    response.status(200).json(success(authorDto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const authorsDto = await AuthorsService.getAll()

    response.status(200).json(success(authorsDto))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createAuthorDto = request.body as CreateAuthorDto

    const authorDto = await AuthorsService.create(createAuthorDto)

    response.status(201).json(success(authorDto))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as AuthorIdParamDto

    const updateAuthorDto = request.body as UpdateAuthorDto

    const authorDto = await AuthorsService.update(id, updateAuthorDto)

    response.status(200).json(success(authorDto))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as AuthorIdParamDto

    const existing = await AuthorsService.delete(id)

    response.status(200).json(success(existing))
  }
}
