import { Book } from "@prisma/client";
import { BookOutDTO } from "../dtos/out/book.dto";
import { CreateBookDto, UpdateBookDto, UpdateBookFilesDto } from "../dtos/in/book.dto";
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
    
    static async create(bookData: CreateBookDto): Promise<BookOutDTO> {
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
            }

            return dto;
        } catch (error) {
            throw new InternalServerError(`Failed to create book: ${error instanceof Error ? error.message : String(error)}`);
        }   
    }

    static async update(isbn: string, bookData: UpdateBookDto): Promise<BookOutDTO> {
        try {
            const updatedBook: Book =  await BooksRepository.update(isbn, bookData);

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
            }

            return dto;
        } catch (error) {
            throw new InternalServerError(`Failed to create book: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    static async updateFiles(isbn: string, files: Partial<UpdateBookDto>): Promise<BookOutDTO> {
        const book = await BooksRepository.getById(isbn);
        if (!book) {
            throw new NotFoundError(`Book with isbn ${isbn} not found`);
        }

        try {
            const updatedBook = await BooksRepository.update(isbn, files);
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
        } catch (error) {
            throw new InternalServerError(`Failed to update book files: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    
}
