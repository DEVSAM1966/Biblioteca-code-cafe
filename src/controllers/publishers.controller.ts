import { Request, Response } from 'express';
import { BadRequestError } from '../models/errors/bad-request.error';
import { PublishersService } from '../services/publishers.service';
import { success } from '../utilities/success.utility';
import { CreatePublisherDto, UpdatePublisherDto } from '../dtos/in/publisher.dto';
import { PublisherIdParamDto } from '../dtos/in/publisher-id.dto';
import { PublisherNameDto } from '../dtos/in/publisher-name.dto';

export class PublishersController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as PublisherIdParamDto;

    const publisherOutDTO = await PublishersService.getById(id);

    response.status(200).json(success(publisherOutDTO));
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params as unknown as PublisherNameDto;

    const publishersOutDTO = await PublishersService.getByName(name);

    response.status(200).json(success(publishersOutDTO));
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const publisherOutDto = await PublishersService.getAll();

    response.status(200).json(success(publisherOutDto));
  }

  static async create(request: Request, response: Response): Promise<void> {
    const publisherInDto = request.body as CreatePublisherDto;

    const createdPublisher = await PublishersService.create(publisherInDto);

    response.status(201).json(success(createdPublisher));
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as PublisherIdParamDto;

    const publisherInDto = request.body as UpdatePublisherDto;

    const updatedPublisher = await PublishersService.update(id, publisherInDto);

    response.status(200).json(success(updatedPublisher));
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as PublisherIdParamDto;

    const existing = await PublishersService.delete(id);

    response.status(200).json(success(existing));
  }
}
