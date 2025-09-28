import { Author } from "@prisma/client";
import { Prisma } from "../configuration/prisma.configuration";

export class AuthorsRepository {
  static async getById(id: number): Promise<Author | null> {
    return await Prisma.author.findUnique({ where: { author_id: id } });
  }

  static async getByName(name: string): Promise<Author | null> {
    return await Prisma.author.findUnique({ where: { name_author: name } });
  }
}
