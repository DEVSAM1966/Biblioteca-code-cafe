import type { Request, Response } from 'express'
import { PublishersService } from '../services/publishers.service'
import { success } from '../utilities/success.utility'
import type { CreatePublisherDto } from '../dtos/in/create-publisher.dto'
import type { PublisherIdParamDto } from '../dtos/in/publisher-id.dto'
import type { PublisherNameDto } from '../dtos/in/publisher-name.dto'
import type { UpdatePublisherDto } from '../dtos/in/update-publisher.dto'

export class PublishersController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as PublisherIdParamDto

    const publisherDto = await PublishersService.getById(id)

    response.status(200).json(success(publisherDto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params as unknown as PublisherNameDto

    const publishersDto = await PublishersService.getByName(name)

    response.status(200).json(success(publishersDto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const publisherDto = await PublishersService.getAll()

    response.status(200).json(success(publisherDto))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createPublisherDto = request.body as CreatePublisherDto

    const publisherDto = await PublishersService.create(createPublisherDto)

    response.status(201).json(success(publisherDto))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as PublisherIdParamDto

    const updatePublisherDto = request.body as UpdatePublisherDto

    const updatedPublisher = await PublishersService.update(id, updatePublisherDto)

    response.status(200).json(success(updatedPublisher))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as PublisherIdParamDto

    const existing = await PublishersService.delete(id)

    response.status(200).json(success(existing))
  }
}
