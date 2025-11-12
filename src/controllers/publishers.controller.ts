import type { Request, Response } from 'express'
import { BadRequestError } from '../models/errors/bad-request.error'
import { PublishersService } from '../services/publishers.service'
import { success } from '../utilities/success.utility'
import type { CreatePublisherDto } from '../dtos/in/create-publisher.dto'

export class PublishersController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const publisherId = parseInt(id, 10)

    if (Number.isNaN(publisherId) || publisherId <= 0) {
      throw new BadRequestError('Invalid ID for publisher')
    }

    const publisherOutdto = await PublishersService.getById(publisherId)

    response.status(200).json(success(publisherOutdto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const name = request.params.name || request.query.name

    if (Array.isArray(name)) {
      throw new BadRequestError('Multiple names not allowed')
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new BadRequestError('Name is missing')
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      throw new BadRequestError('Name can only contain characters and spaces')
    }

    const publishersOutdto = await PublishersService.getByName(name)

    response.status(200).json(success(publishersOutdto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const publisherOutDto = await PublishersService.getAll()

    response.status(200).json(success(publisherOutDto))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const dto = request.body as CreatePublisherDto

    const createdPublisher = await PublishersService.create(dto)

    response.status(201).json(success(createdPublisher))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const publisherId = parseInt(id, 10)

    if (Number.isNaN(publisherId) || publisherId <= 0) {
      throw new BadRequestError('Invalid ID for Publisher')
    }

    const dto = request.body as CreatePublisherDto

    const updatedPublisher = await PublishersService.update(publisherId, dto)

    response.status(200).json(success(updatedPublisher))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const publisherId = parseInt(id, 10)

    if (Number.isNaN(publisherId) || publisherId <= 0) {
      throw new BadRequestError('Invalid ID for publisher')
    }

    const existing = await PublishersService.delete(publisherId)

    response.status(200).json(success(existing))
  }
}
