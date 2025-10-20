import { Book } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

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

}