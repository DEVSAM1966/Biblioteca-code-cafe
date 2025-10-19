import { Book } from "@prisma/client";
import { BookOutDTO } from "../dtos/out/book.dto";
import { NotFoundError } from "../models/errors/not-found.error";
import { InternalServerError } from "../models/errors/internal-server.error";
import { BooksRepository } from "../repositories/books.repository";

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
    
}
