import type { CreatePublisherDto } from '../dtos/in/create-publisher.dto'
import { NotFoundError } from '../models/errors/not-found.error'
import { InternalServerError } from '../models/errors/internal-server.error'
import { PublishersRepository } from '../repositories/publishers.repository'
import type { PublisherDto } from '../dtos/out/publisher.dto'
import type { UpdatePublisherDto } from '../dtos/in/update-publisher.dto'

export class PublishersService {
  static async getById(id: number): Promise<PublisherDto> {
    const publisher = await PublishersRepository.getById(id)

    if (!publisher) {
      throw new NotFoundError(`Publisher with ${id} not found`)
    }

    const dto: PublisherDto = {
      publisherId: publisher.publisherId,
      namePublisher: publisher.namePublisher,
      address: publisher.address,
      city: publisher.city,
      province: publisher.province,
      postalCode: publisher.postalCode,
      country: publisher.country,
      phone: publisher.phone,
      notes: publisher.notes,
    }

    return dto
  }

  static async getByName(name: string): Promise<PublisherDto[]> {
    const publishers = await PublishersRepository.getByName(name)

    if (!publishers || publishers.length === 0) {
      throw new NotFoundError(`No publisher found with name: ${name}`)
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
    }))
  }

  static async getAll(): Promise<PublisherDto[]> {
    const publishers = await PublishersRepository.getAll()

    if (publishers.length === 0) {
      throw new NotFoundError(`There are not records in Publishers`)
    }

    const dto: PublisherDto[] = publishers.map((publisher) => ({
      publisherId: publisher.publisherId,
      namePublisher: publisher.namePublisher,
      address: publisher.address,
      city: publisher.city,
      province: publisher.province,
      postalCode: publisher.postalCode,
      country: publisher.country,
      phone: publisher.phone,
      notes: publisher.notes,
    }))

    return dto
  }

  static async create(data: CreatePublisherDto): Promise<PublisherDto> {
    try {
      return await PublishersRepository.create(data)
    } catch (error: any) {
      throw new InternalServerError(`Failed to create publisher, ${error.message}`)
    }
  }

  static async update(id: number, data: UpdatePublisherDto): Promise<PublisherDto> {
    const existing = await PublishersRepository.getById(id)

    if (!existing) {
      throw new NotFoundError(`Publisher with ${id} not found`)
    }

    try {
      const updated = await PublishersRepository.update(id, data)

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
      }
    } catch (error: any) {
      throw new InternalServerError(`Failed to update publisher, ${error.message}`)
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await PublishersRepository.delete(id)

      if (result.count === 0) {
        throw new NotFoundError(`Publisher with ${id} not found`)
      }

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(`Failed to delete publisher, ${error.message}`)
    }
  }
}
