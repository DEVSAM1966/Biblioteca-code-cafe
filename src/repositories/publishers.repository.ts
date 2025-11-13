import type { Prisma, Publisher } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration'

export class PublishersRepository {
  static async getById(id: number): Promise<Publisher | null> {
    return await prisma.publisher.findUnique({ where: { publisherId: id } })
  }

  static async getByName(name: string): Promise<Publisher[]> {
    return await prisma.publisher.findMany({
      where: {
        namePublisher: {
          contains: name,
        },
      },
    })
  }

  static async getAll(): Promise<Publisher[]> {
    return await prisma.publisher.findMany()
  }

  static async create(data: Prisma.PublisherCreateInput): Promise<Publisher> {
    return await prisma.publisher.create({ data })
  }

  static async update(id: number, data: Prisma.PublisherUpdateInput): Promise<Publisher> {
    return await prisma.publisher.update({
      where: { publisherId: id },
      data,
    })
  }

  static async delete(id: number): Promise<{ count: number }> {
    return await prisma.publisher.deleteMany({ where: { publisherId: id } })
  }
}
