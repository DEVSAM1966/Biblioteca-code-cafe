import { Publisher } from "@prisma/client";
import { Prisma } from "../configuration/prisma.configuration";

export class PublishersRepository {
    static async getById(id: number): Promise<Publisher | null> {
        return await Prisma.publisher.findUnique({ where: { publisher_id: id}});
    }

    static async getByName(name: string): Promise<Publisher[]> {
        return await Prisma.publisher.findMany({
            where: {
                name_publisher: {
                    contains: name,
                },
            },
        });
    }

    static async getAll(): Promise<Publisher[]> {
        return await Prisma.publisher.findMany();
    }
}