import { Publisher } from "@prisma/client";
import { Prisma } from "../configuration/prisma.configuration";

export class PublishersRepository {
    static async getById(id: number): Promise<Publisher | null> {
        return await Prisma.publisher.findUnique({ where: { publisher_id: id}});
    }
}