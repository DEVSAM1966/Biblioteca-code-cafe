import { Author } from '@prisma/client';
import { prisma } from '../configuration/prisma.configuration';
import { CreateAuthorDto } from '../dtos/in/create-author.dto';

export class AuthorsRepository {
  static async getById(id: number): Promise<Author | null> {
    return await prisma.author.findUnique({ where: { authorId: id } });
  }

  static async getByName(name: string): Promise<Author | null> {
    return await prisma.author.findUnique({ where: { nameAuthor: name } });
  }

  static async getAll(): Promise<Author[]> {
    return await prisma.author.findMany();
  }

  static async create(data: CreateAuthorDto): Promise<Author> {
    return await prisma.author.create({ data: { nameAuthor: data.name } });
  }

  static async delete(id: number): Promise<Author> {
    return await prisma.author.delete({ where: { authorId: id } });
  }
}
