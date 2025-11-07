import { Book } from '@prisma/client';
import { BookOutDTO } from '../dtos/out/book.dto';
import { CreateBookDto, UpdateBookDto, UpdateBookFilesDto } from '../dtos/in/book.dto';
import { NotFoundError } from '../models/errors/not-found.error';
import { InternalServerError } from '../models/errors/internal-server.error';
import { BooksRepository } from '../repositories/books.repository';
import { deleteIfExists } from '../utilities/file.utility';
import fs from 'fs/promises';
import { ConflictError } from '../models/errors/conflict.error';

export class BooksService {
  static async getById(id: string): Promise<BookOutDTO> {
    const book: Book | null = await BooksRepository.getById(id);

    if (!book) {
      throw new NotFoundError(`Book with isbn ${id} not found`);
    }

    const dto: BookOutDTO = {
      isbn: book.isbn,
      title: book.title,
      summary: book.summary ?? null,
      pages: book.pages ?? null,
      editionDate: (book.editionDate as unknown as Date)?.toISOString() ?? null,
      bookCover: book.bookCover ?? null,
      bookFile: book.bookFile ?? null,
      language: book.language ?? null,
      authorId: book.authorId ?? null,
      authors: book.authors ?? null,
      publisherId: book.publisherId ?? null,
      categoryId: book.categoryId ?? null,
    };

    return dto;
  }

  static async getByName(name: string): Promise<BookOutDTO[]> {
    const books: Book[] = await BooksRepository.getByName(name);

    if (!books || books.length === 0) {
      throw new NotFoundError(`No book found with title: ${name}`);
    }

    return books.map((book) => ({
      isbn: book.isbn,
      title: book.title,
      summary: book.summary ?? null,
      pages: book.pages ?? null,
      editionDate: (book.editionDate as unknown as Date)?.toISOString() ?? null,
      bookCover: book.bookCover ?? null,
      bookFile: book.bookFile ?? null,
      language: book.language ?? null,
      authorId: book.authorId ?? null,
      authors: book.authors ?? null,
      publisherId: book.publisherId ?? null,
      categoryId: book.categoryId ?? null,
    }));
  }

  static async getAll(): Promise<BookOutDTO[]> {
    const books: Book[] = await BooksRepository.getAll();

    if (!books.length) {
      throw new NotFoundError(`There are no records in Books`);
    }

    const dto: BookOutDTO[] = books.map((book) => ({
      isbn: book.isbn,
      title: book.title,
      summary: book.summary ?? null,
      pages: book.pages ?? null,
      editionDate: (book.editionDate as unknown as Date)?.toISOString() ?? null,
      bookCover: book.bookCover ?? null,
      bookFile: book.bookFile ?? null,
      language: book.language ?? null,
      authorId: book.authorId ?? null,
      authors: book.authors ?? null,
      publisherId: book.publisherId ?? null,
      categoryId: book.categoryId ?? null,
    }));

    return dto;
  }

  static async create(bookData: CreateBookDto): Promise<BookOutDTO> {
    const existing = await BooksRepository.getById(bookData.isbn);

    if (existing) {
      throw new ConflictError(`Book with ISBN ${bookData.isbn} already exists`);
    }

    try {
      const newBook: Book = await BooksRepository.create(bookData);

      const dto: BookOutDTO = {
        isbn: newBook.isbn,
        title: newBook.title,
        summary: newBook.summary ?? null,
        pages: newBook.pages ?? null,
        editionDate: (newBook.editionDate as unknown as Date)?.toISOString() ?? null,
        bookCover: newBook.bookCover ?? null,
        bookFile: newBook.bookFile ?? null,
        language: newBook.language ?? null,
        authorId: newBook.authorId ?? null,
        authors: newBook.authors ?? null,
        publisherId: newBook.publisherId ?? null,
        categoryId: newBook.categoryId ?? null,
      };

      return dto;
    } catch (error) {
      throw new InternalServerError(
        `Failed to create book: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  static async update(isbn: string, bookData: UpdateBookDto): Promise<BookOutDTO> {
    const existing = await BooksRepository.getById(isbn);

    if (!existing) {
      throw new NotFoundError(`Book with isbn ${isbn} not found`);
    }

    try {
      const updatedBook: Book = await BooksRepository.update(isbn, bookData);

      const dto: BookOutDTO = {
        isbn: updatedBook.isbn,
        title: updatedBook.title,
        summary: updatedBook.summary ?? null,
        pages: updatedBook.pages ?? null,
        editionDate: (updatedBook.editionDate as unknown as Date)?.toISOString() ?? null,
        bookCover: updatedBook.bookCover ?? null,
        bookFile: updatedBook.bookFile ?? null,
        language: updatedBook.language ?? null,
        authorId: updatedBook.authorId ?? null,
        authors: updatedBook.authors ?? null,
        publisherId: updatedBook.publisherId ?? null,
        categoryId: updatedBook.categoryId ?? null,
      };

      return dto;
    } catch (error) {
      throw new InternalServerError(
        `Failed to create book: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  static async updateFiles(
    isbn: string,
    files: Partial<UpdateBookDto> & {
      bookCoverBuffer?: Buffer;
      bookFileBuffer?: Buffer;
    },
  ): Promise<BookOutDTO> {
    const book = await BooksRepository.getById(isbn);
    if (!book) {
      throw new NotFoundError(`Book with ISBN ${isbn} not found`);
    }

    // Eliminar archivos antiguos si existen
    await deleteIfExists(book.bookCover);
    await deleteIfExists(book.bookFile);

    // Actualizar BD
    let updatedBook;
    try {
      updatedBook = await BooksRepository.update(isbn, {
        bookCover: files.bookCover,
        bookFile: files.bookFile,
      });
    } catch (error) {
      throw new InternalServerError(
        `Failed to update book files: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    // Escribir nuevos archivos en disco
    try {
      if (files.bookCover && files.bookCoverBuffer) {
        await fs.writeFile(files.bookCover, files.bookCoverBuffer);
      }
      if (files.bookFile && files.bookFileBuffer) {
        await fs.writeFile(files.bookFile, files.bookFileBuffer);
      }
    } catch (error) {
      console.warn(
        `Warning: Failed to write one or more files to disk: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    // Retornar DTO
    return {
      isbn: updatedBook.isbn,
      title: updatedBook.title,
      summary: updatedBook.summary ?? null,
      pages: updatedBook.pages ?? null,
      editionDate: updatedBook.editionDate?.toISOString() ?? null,
      bookCover: updatedBook.bookCover ?? null,
      bookFile: updatedBook.bookFile ?? null,
      language: updatedBook.language ?? null,
      authorId: updatedBook.authorId ?? null,
      authors: updatedBook.authors ?? null,
      publisherId: updatedBook.publisherId ?? null,
      categoryId: updatedBook.categoryId ?? null,
    };
  }

  static async delete(isbn: string): Promise<Boolean> {
    try {
      const book: Book | null = await BooksRepository.getById(isbn);

      if (!book) {
        throw new NotFoundError(`Book with isbn ${isbn} not found`);
      }

      const result = await BooksRepository.delete(isbn);

      if (result.count === 0) {
        throw new NotFoundError(`Book with isbn ${isbn} not found`);
      }

      await deleteIfExists(book.bookCover);
      await deleteIfExists(book.bookFile);

      return true;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError('Failed to delete book: ${cause: error}');
    }
  }
}
