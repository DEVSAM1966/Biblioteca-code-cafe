import { Router } from 'express'
import { PublishersController } from '../controllers/publishers.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { PublisherIdParamDto } from '../dtos/in/publisher-id.dto'
import { PublisherNameDto } from '../dtos/in/publisher-name.dto'
import { CreatePublisherDto } from '../dtos/in/create-publisher.dto'
import { UpdatePublisherDto } from '../dtos/in/update-publisher.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '@prisma/client'

export const PublishersRoutes = Router()

PublishersRoutes.get(
  '/id/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  PublishersController.getById,
)

PublishersRoutes.get(
  '/name/:name',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  dtoValidationMiddleware(PublisherNameDto, 'params'),
  PublishersController.getByName,
)

PublishersRoutes.get(
  '/',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  PublishersController.getAll,
)

PublishersRoutes.post(
  '/',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(CreatePublisherDto),
  PublishersController.create,
)

PublishersRoutes.put(
  '/id/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  dtoValidationMiddleware(UpdatePublisherDto),
  PublishersController.update,
)

PublishersRoutes.delete(
  '/id/:id',
  authMiddleware(UserRole.ADMIN),
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  PublishersController.delete,
)
