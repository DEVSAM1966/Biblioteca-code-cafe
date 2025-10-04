import { Author } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

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
}
