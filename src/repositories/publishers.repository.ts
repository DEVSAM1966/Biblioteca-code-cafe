import { Publisher } from '@prisma/client';
import { prisma } from '../configuration/prisma.configuration';
import { CreatePublisherDto, UpdatePublisherDto } from '../dtos/in/publisher.dto';

export class PublishersRepository {
  static async getById(id: number): Promise<Publisher | null> {
    return await prisma.publisher.findUnique({ where: { publisherId: id } });
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

  static async create(data: CreatePublisherDto): Promise<Publisher> {
    return await prisma.publisher.create({
      data: {
        publisherId: data.publisherId,
        namePublisher: data.namePublisher,
        address: data.address,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        country: data.country,
        phone: data.phone,
        notes: data.notes,
      },
    });
  }

  static async update(id: number, data: UpdatePublisherDto): Promise<Publisher> {
    return await prisma.publisher.update({
      where: { publisherId: id },
      data: {
        namePublisher: data.namePublisher,
        address: data.address,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        country: data.country,
        phone: data.phone,
        notes: data.notes,
      },
    });
  }

  static async delete(id: number): Promise<{ count: number }> {
    return await prisma.publisher.deleteMany({ where: { publisherId: id } });
  }
}
