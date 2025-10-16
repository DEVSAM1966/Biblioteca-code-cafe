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
      publisherId: publisher.publisherId,
      namePublisher: publisher.namePublisher,
      address: publisher.address,
      city: publisher.city,
      province: publisher.province,
      postalCode: publisher.postalCode,
      country: publisher.country,
      phone: publisher.phone,
      notes: publisher.notes,
    };

    return dto;
  }

  static async getByName(name: string): Promise<PublisherOutDTO[]> {
    const publishers = await PublishersRepository.getByName(name);

    if (!publishers || publishers.length === 0) {
      throw new NotFoundError(`No publisher found with name: ${name}`);
    }

    return publishers.map((publisher) => ({
      publisherId: publisher.publisherId,
      namePublisher: publisher.namePublisher,
      address: publisher.address,
      city: publisher.city,
      province: publisher.province,
      postalCode: publisher.postalCode,
      country: publisher.country,
      phone: publisher.phone,
      notes: publisher.notes,
    }));
  }

  static async getAll(): Promise<PublisherOutDTO[]> {
    const publishers = await PublishersRepository.getAll();

    if (publishers.length === 0) {
      throw new NotFoundError(`There are no records in Publishers`);
    }

    const dto: PublisherOutDTO[] = publishers.map((publisher) => ({
      publisherId: publisher.publisherId,
      namePublisher: publisher.namePublisher,
      address: publisher.address,
      city: publisher.city,
      province: publisher.province,
      postalCode: publisher.postalCode,
      country: publisher.country,
      phone: publisher.phone,
      notes: publisher.notes,
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

  static async update(id: number, data: CreatePublisherDto): Promise<PublisherOutDTO> {
    const existing = await PublishersRepository.getById(id);

    if (!existing) {
      throw new NotFoundError(`Publisher with id ${id} not found`);
    }

    try {
      const updated = await PublishersRepository.update(id, data);

      return {
        publisherId: updated.publisherId,
        namePublisher: updated.namePublisher,
        address: updated.address,
        city: updated.city,
        province: updated.province,
        postalCode: updated.postalCode,
        country: updated.country,
        phone: updated.phone,
        notes: updated.notes,
      };
    } catch (error) {
      throw new InternalServerError("Failed to update publisher");
    }
  }

}
