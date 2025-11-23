import { AuthorsRepository } from '../repositories/authors.repository'
import { NotFoundError } from '../models/errors/not-found.error'
import type { CreateAuthorDto } from '../dtos/in/create-author.dto'
import type { UpdateAuthorDto } from '../dtos/in/update-author.dto'
import type { Author } from '@prisma/client'
import { InternalServerError } from '../models/errors/internal-server.error'
import type { AuthorDto } from '../dtos/out/author.dto'

export class AuthorsService {
  static async getById(id: number): Promise<AuthorDto> {
    const author = await AuthorsRepository.getById(id)

    if (!author) {
      throw new NotFoundError(`Author with id ${id} not found`)
    }

    const dto: AuthorDto = {
      authorId: author.authorId,
      nameAuthor: author.nameAuthor,
    }

    return dto
  }

  static async getByName(name: string): Promise<AuthorDto[]> {
    const authors = await AuthorsRepository.getByName(name)

    if (!authors || authors.length === 0) {
      throw new NotFoundError(`Author with name ${name} not found`)
    }

    return authors.map((author) => ({
      authorId: author.authorId,
      nameAuthor: author.nameAuthor,
    }))
  }

  static async getAll(): Promise<AuthorDto[]> {
    const authors = await AuthorsRepository.getAll()

    if (authors.length === 0) {
      throw new NotFoundError('There are no records in Authors')
    }

    const authorsOutdto: AuthorDto[] = authors.map((author) => ({
      authorId: author.authorId,
      nameAuthor: author.nameAuthor,
    }))

    return authorsOutdto
  }

  static async create(data: CreateAuthorDto): Promise<AuthorDto> {
    try {
      const newAuthor: Author = await AuthorsRepository.create(data)

      const authorOutDto: AuthorDto = {
        authorId: newAuthor.authorId,
        nameAuthor: newAuthor.nameAuthor,
      }

      return authorOutDto
    } catch (error) {
      throw new InternalServerError(
        `Failed to create author: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  static async update(id: number, data: UpdateAuthorDto): Promise<AuthorDto> {
    const existingAuthor = await AuthorsRepository.getById(id)

    if (!existingAuthor) {
      throw new NotFoundError(`Author with ID ${id} not found`)
    }

    try {
      const updatedAuthor: Author = await AuthorsRepository.update(id, data)

      const authorOutDto: AuthorDto = {
        authorId: updatedAuthor.authorId,
        nameAuthor: updatedAuthor.nameAuthor,
      }

      return authorOutDto
    } catch (error) {
      throw new InternalServerError(
        `Failed to update author: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await AuthorsRepository.delete(id)

      if (!result) {
        throw new NotFoundError(`Author with ID ${id} not found`)
      }

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to delete author')
    }
  }
}
