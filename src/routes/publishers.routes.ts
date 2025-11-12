import { Router } from 'express'
import { PublishersController } from '../controllers/publishers.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreatePublisherDto, UpdatePublisherDto } from '../dtos/in/publisher.dto'
import { PublisherIdParamDto } from '../dtos/in/publisher-id.dto'
import { PublisherNameDto } from '../dtos/in/publisher-name.dto'

export const PublishersRoutes = Router()

PublishersRoutes.get(
  '/id/:id',
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  PublishersController.getById,
)

PublishersRoutes.get(
  '/name/:name',
  dtoValidationMiddleware(PublisherNameDto, 'params'),
  PublishersController.getByName,
)

PublishersRoutes.get('/', PublishersController.getAll)

PublishersRoutes.post(
  '/',
  dtoValidationMiddleware(CreatePublisherDto, 'body'),
  PublishersController.create,
)

PublishersRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  dtoValidationMiddleware(UpdatePublisherDto, 'body'),
  PublishersController.update,
)

PublishersRoutes.delete(
  '/id/:id',
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  PublishersController.delete,
)
