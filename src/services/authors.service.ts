import { AuthorsRepository } from '../repositories/authors.repository';
import { AuthorOutDTO } from '../dtos/out/author.dto';
import { NotFoundError } from '../models/errors/not-found.error';
import { CreateAuthorDto } from '../dtos/in/create-author.dto';
import { Author } from '@prisma/client';
import { InternalServerError } from '../models/errors/internal-server.error';

export class AuthorsService {
  static async getById(id: number): Promise<AuthorOutDTO> {
    const author = await AuthorsRepository.getById(id);

    if (!author) {
      throw new NotFoundError(`Author with id ${id} not found`);
    }

    const dto: AuthorOutDTO = {
      authorId: author.authorId,
      nameAuthor: author.nameAuthor,
    };

    return dto;
  }

  static async getByName(name: string): Promise<AuthorOutDTO> {
    const author = await AuthorsRepository.getByName(name);

    if (!author) {
      throw new NotFoundError(`Author with name ${name} not found`);
    }

    const dto: AuthorOutDTO = {
      authorId: author.authorId,
      nameAuthor: author.nameAuthor,
    };

    return dto;
  }

  static async getAll(): Promise<AuthorOutDTO[]> {
    const authors = await AuthorsRepository.getAll();

    if (authors.length === 0) {
      throw new NotFoundError('There are no records in Authors');
    }

    const authorsOutDTO: AuthorOutDTO[] = authors.map((author) => ({
      authorId: author.authorId,
      nameAuthor: author.nameAuthor,
    }));

    return authorsOutDTO;
  }

  static async create(data: CreateAuthorDto): Promise<AuthorOutDTO> {
    try {
      const newAuthor: Author = await AuthorsRepository.create(data);

      const authorOutDto: AuthorOutDTO = {
        authorId: newAuthor.authorId,
        nameAuthor: newAuthor.nameAuthor,
      };

      return authorOutDto;
    } catch (error) {
      throw new InternalServerError(
        `Failed to create author: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await AuthorsRepository.delete(id);

      if (!result) {
        throw new NotFoundError(`Author with ID ${id} not found`);
      }

      return true;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError('Failed to delete author');
    }
  }
}
