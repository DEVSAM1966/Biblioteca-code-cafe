import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { BooksService } from "../services/books.service";
import { success } from "../utilities/success.utility";

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

}