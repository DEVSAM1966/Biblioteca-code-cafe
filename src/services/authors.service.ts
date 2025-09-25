import { Author } from "@prisma/client";
import { AuthorsRepository } from "../repositories/authors.repository";
import { NotFoundError } from "../models/errors/not-found.error";

export class AuthorsService {
  static async getById(id: number): Promise<Author> {
    const author = await AuthorsRepository.getById(id);

    if (!author) {
      throw new NotFoundError(`Author with id ${id} not found`);
    }

    return author
  }
}
