import type { Author } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration'
import type { CreateAuthorDto } from '../dtos/in/create-author.dto'
import type { UpdateAuthorDto } from '../dtos/in/update-author.dto'

export class AuthorsRepository {
  static async getById(id: number): Promise<Author | null> {
    return await prisma.author.findUnique({ where: { authorId: id } })
  }

  static async getByName(name: string): Promise<Author[]> {
    return await prisma.author.findMany({
      where: {
        nameAuthor: {
          contains: name,
        },
      },
    })
  }

  static async getAll(): Promise<Author[]> {
    return await prisma.author.findMany()
  }

  static async create(data: CreateAuthorDto): Promise<Author> {
    return await prisma.author.create({
      data: {
        nameAuthor: data.nameAuthor,
      },
    })
  }

  static async update(authorId: number, data: UpdateAuthorDto): Promise<Author> {
    return await prisma.author.update({
      where: { authorId },
      data: {
        nameAuthor: data.nameAuthor,
      },
    })
  }

  static async delete(id: number): Promise<{ count: number }> {
    return await prisma.author.deleteMany({ where: { authorId: id } })
  }
}
