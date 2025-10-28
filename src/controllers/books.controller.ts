import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { BooksService } from "../services/books.service";
import { success } from "../utilities/success.utility";
import { BookOutDTO } from "../dtos/out/book.dto";
import { CreateBookDto, UpdateBookDto } from "../dtos/in/book.dto";
import { generateSafeFilename } from "../utilities/filename.utility";
import { deleteUploadedFiles } from "../utilities/file.utility";
import path from "path";


export class BooksController {
    static async getById(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        if (typeof id !== "string" || id.trim().length === 0) {
            throw new BadRequestError("Isbn is missing");
        }

        if (!/^\d+$/.test(id)) {
            throw new BadRequestError("Isbn can only contain number");
        }

        const booksOutDTO = await BooksService.getById(id);

        response.status(200).json(success(booksOutDTO));
    }

    static async getByName(request: Request, response: Response): Promise<void> {
        const name = request.params.name || request.query.name;

        if (Array.isArray(name)) {
            throw new BadRequestError("Multiple names not allowed");
        }
    
        if (typeof name !== "string" || name.trim().length === 0) {
            throw new BadRequestError("Title is missing");
        }

        if (!/^[\p{L}\s]+$/u.test(name)) {
            throw new BadRequestError("Title can only contain characters and spaces");
        }

        const booksOutDTO = await BooksService.getByName(name);

        response.status(200).json(success(booksOutDTO));
    }

    static async getAll(_request: Request, response: Response): Promise<void> {
        const booksOutDto = await BooksService.getAll();

        response.status(200).json(success(booksOutDto));
    }

    static async create(request: Request, response: Response): Promise<void> {
        const createBookDto: CreateBookDto = request.body;

        const bookOutDto: BookOutDTO = await BooksService.create(createBookDto);

        response.status(201).json(success(bookOutDto));
    }

    static async update(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        if (typeof id !== "string" || id.trim().length === 0) {
            throw new BadRequestError("Isbn is missing");
        }

        if (!/^\d+$/.test(id)) {
            throw new BadRequestError("Isbn can only contain number");
        }

        const updateBookDto: UpdateBookDto = request.body;

        const bookOutDto: BookOutDTO = await BooksService.update(id, updateBookDto);

        response.status(200).json(success(bookOutDto));
    }

    static async updateFiles(request: Request, response: Response): Promise<void> {
        const { isbn } = request.params;
        const files = request.files as {
            bookCover?: Express.Multer.File[];
            bookFile?: Express.Multer.File[];
        };

        if (!isbn || !/^\d+$/.test(isbn)) {
            throw new BadRequestError("Invalid ISBN format");
        }

        const bookCover = files.bookCover?.[0];
        const bookFile = files.bookFile?.[0];
        if (!bookCover || !bookFile) {
            throw new BadRequestError("Both 'bookCover' and 'bookFile' must be provided");
        }

        const bookCoverPath = `uploads/cover/${generateSafeFilename(bookCover.originalname, isbn)}`;
        const bookFilePath = `uploads/file/${generateSafeFilename(bookFile.originalname, isbn)}`;

        const bookOutDto = await BooksService.updateFiles(isbn, {
            bookCover: bookCoverPath,
            bookFile: bookFilePath,
            bookCoverBuffer: bookCover.buffer,
            bookFileBuffer: bookFile.buffer,
        });

        response.status(200).json(success(bookOutDto));
    }

    static async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        
        if (typeof id !== "string" || id.trim().length === 0) {
            throw new BadRequestError("Isbn is missing");
        }

        if (!/^\d+$/.test(id)) {
            throw new BadRequestError("Isbn can only contain number");
        }
        
        const existing = await BooksService.delete(id);

        response.status(200).json(success(existing));
    }

}