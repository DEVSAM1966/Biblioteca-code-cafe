import { Book } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { CreateBookDto, UpdateBookDto } from "../dtos/in/book.dto"; 


export class BooksRepository {
    static async getById(id: string): Promise<Book | null> {
        return await prisma.book.findUnique({ where: { isbn: id } });
    }

    static async getByName(name: string): Promise<Book[]> {
        return await prisma.book.findMany({
            where: {
                title: {
                    contains: name,
                },
            },
        });
    }

    static async getAll(): Promise<Book[]> {
        return await prisma.book.findMany();
    }

    static async create(bookData: CreateBookDto): Promise<Book> {
        return await prisma.book.create({ data: bookData });
    }

    static async update(id: string, bookData: Partial<UpdateBookDto>): Promise<Book> {
        return await prisma.book.update({
            where: { isbn: id },
            data: bookData,
        });
    }
}