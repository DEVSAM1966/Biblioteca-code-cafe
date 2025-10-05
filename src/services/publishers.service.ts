import { Publisher } from "@prisma/client";
import { CreatePublisherDto } from "../dtos/in/publisher.dto";
import { PublisherOutDTO } from "../dtos/out/publisher.dto";
import { NotFoundError } from "../models/errors/not-found.error";
import { InternalServerError } from "../models/errors/internal-server.error";
import { PublishersRepository } from "../repositories/publishers.repository";

export class PublishersService {
  static async getById(id: number): Promise<PublisherOutDTO> {
    const publisher = await PublishersRepository.getById(id);

    if (!publisher) {
      throw new NotFoundError(`Publisher with id ${id} not found`);
    }

    const dto: PublisherOutDTO = {
      publisher_id: publisher.publisher_id,
      name_publisher: publisher.name_publisher,
      address: publisher.address ?? undefined,
      city: publisher.city ?? undefined,
      province: publisher.province ?? undefined,
      postal_code: publisher.postal_code ?? undefined,
      country: publisher.country ?? undefined,
      phone: publisher.phone ?? undefined,
      notes: publisher.notes ?? undefined,
    };

    return dto;
  }

  static async getByName(name: string): Promise<PublisherOutDTO[]> {
    const publishers = await PublishersRepository.getByName(name);

    if (!publishers || publishers.length === 0) {
      throw new NotFoundError(`No publisher found with name: ${name}`);
    }

    return publishers.map(publisher => ({
      publisher_id: publisher.publisher_id,
      name_publisher: publisher.name_publisher,
      address: publisher.address ?? undefined,
      city: publisher.city ?? undefined,
      province: publisher.province ?? undefined,
      postal_code: publisher.postal_code ?? undefined,
      country: publisher.country ?? undefined,
      phone: publisher.phone ?? undefined,
      notes: publisher.notes ?? undefined,
    }));
  }

  static async getAll(): Promise<PublisherOutDTO[]> {
    const publishers = await PublishersRepository.getAll();

    if (publishers.length === 0) {
      throw new NotFoundError(`There are no records in Publishers`);
    }

    const dto: PublisherOutDTO[] = publishers.map((publisher) => ({
      publisher_id: publisher.publisher_id,
      name_publisher: publisher.name_publisher,
      address: publisher.address ?? undefined,
      city: publisher.city ?? undefined,
      province: publisher.province ?? undefined,
      postal_code: publisher.postal_code ?? undefined,
      country: publisher.country ?? undefined,
      phone: publisher.phone ?? undefined,
      notes: publisher.notes ?? undefined,
    }));

    return dto;
  }

  static async create(data: CreatePublisherDto): Promise<Publisher> {
    try {
        return await PublishersRepository.create(data);
    } catch (error) {
        throw new InternalServerError("Failed to create publisher");
    }
  }
}
