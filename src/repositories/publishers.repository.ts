import { Publisher } from "@prisma/client";
import { Prisma } from "../configuration/prisma.configuration";
import { CreatePublisherDto } from "../dtos/in/publisher.dto";

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

    static async create(data: CreatePublisherDto): Promise<Publisher> {
        return await Prisma.publisher.create({
            data: {
                publisher_id: data.publisher_id,
                name_publisher: data.name_publisher,
                address: data.address,
                city: data.city,
                province: data.province,
                postal_code: data.postal_code,
                country: data.country,
                phone: data.phone,
                notes: data.notes,
            },
        });
    }
}