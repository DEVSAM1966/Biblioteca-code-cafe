import { Publisher } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class PublishersRepository {
    static async getById(id: number): Promise<Publisher | null> {
        return await prisma.publisher.findUnique({ where: { publisherId: id}});
    }

    static async getByName(name: string): Promise<Publisher[]> {
        return await prisma.publisher.findMany({
            where: {
                namePublisher: {
                    contains: name,
                },
            },
        });
    }

    static async getAll(): Promise<Publisher[]> {
        return await prisma.publisher.findMany();
    }
}