import { Author } from "@prisma/client";
import { AuthorsRepository } from "../repositories/authors.repository";

export class AuthorsService {
  static async getById(id: number): Promise<Author | null> {
    return await AuthorsRepository.getById(id);
  }
}
