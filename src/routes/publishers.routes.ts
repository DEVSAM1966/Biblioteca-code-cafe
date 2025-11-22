import { Router } from 'express'
import { PublishersController } from '../controllers/publishers.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { PublisherIdParamDto } from '../dtos/in/publisher-id.dto'
import { PublisherNameDto } from '../dtos/in/publisher-name.dto'
import { CreatePublisherDto } from '../dtos/in/create-publisher.dto'
import { UpdatePublisherDto } from '../dtos/in/update-publisher.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { UserRole } from '@prisma/client'

export const PublishersRoutes = Router()

PublishersRoutes.get(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  PublishersController.getById,
)

PublishersRoutes.get(
  '/name/:name', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(PublisherNameDto, 'params'),
  PublishersController.getByName,
)

PublishersRoutes.get(
  '/',
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  PublishersController.getAll,
)

PublishersRoutes.post(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(CreatePublisherDto), 
  PublishersController.create,
)

PublishersRoutes.put(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  dtoValidationMiddleware(UpdatePublisherDto),
  PublishersController.update,
)

PublishersRoutes.delete(
  '/id/:id', 
  authMiddleware(), 
  authorize([UserRole.ADMIN]), 
  dtoValidationMiddleware(PublisherIdParamDto, 'params'),
  PublishersController.delete,
)
