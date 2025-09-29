import { AuthorsRepository } from "../repositories/authors.repository";
import { AuthorOutDTO } from "../dtos/out/author.dto";
import { NotFoundError } from "../models/errors/not-found.error";

export class AuthorsService {
  static async getById(id: number): Promise<AuthorOutDTO> {
    const author = await AuthorsRepository.getById(id);

    if (!author) {
      throw new NotFoundError(`Author with id ${id} not found`);
    }

    const dto: AuthorOutDTO = {
      author_id: author.author_id,
      name_author: author.name_author,
    };

    return dto;
  }

  static async getByName(name: string): Promise<AuthorOutDTO> {
    const author = await AuthorsRepository.getByName(name);

    if (!author) {
      throw new NotFoundError(`Author with name ${name} not found`);
    }

    const dto: AuthorOutDTO = {
      author_id: author.author_id,
      name_author: author.name_author,
    };

    return dto;
  }
}
