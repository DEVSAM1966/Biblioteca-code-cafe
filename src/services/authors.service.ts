import { AuthorsRepository } from "../repositories/authors.repository";
import { AuthorOutDTO } from "../dtos/out/author.dto";

export class AuthorsService {
  static async getById(id: number): Promise<AuthorOutDTO | null> {
    const author = await AuthorsRepository.getById(id);

    if (!author) return null

    const dto: AuthorOutDTO = {
      author_id: author.author_id,
      name_author: author.name_author,
    };

    return dto;
  }
}
