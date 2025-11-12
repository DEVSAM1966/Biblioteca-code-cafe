import { Router } from 'express'
import { PublishersController } from '../controllers/publishers.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreatePublisherDto } from '../dtos/in/create-publisher.dto'
import { UpdatePublisherDto } from '../dtos/in/update-publisher.dto'

export const PublishersRoutes = Router()

PublishersRoutes.get('/id/:id', PublishersController.getById)

PublishersRoutes.get('/name/:name', PublishersController.getByName)

PublishersRoutes.get('/', PublishersController.getAll)

PublishersRoutes.post('/', dtoValidationMiddleware(CreatePublisherDto), PublishersController.create)

PublishersRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(UpdatePublisherDto),
  PublishersController.update,
)

PublishersRoutes.delete('/id/:id', PublishersController.delete)
