import { Router } from 'express'
import { HistoriesController } from '../controllers/histories.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { HistoryIdParamDto } from '../dtos/in/history-id.dto'
import { CreateHistoryDto } from '../dtos/in/create-history.dto'

export const HistoriesRouter = Router()

HistoriesRouter.get('/', HistoriesController.getAll)

HistoriesRouter.get(
  '/loan/:id',
  dtoValidationMiddleware(HistoryIdParamDto, 'params'),
  HistoriesController.getByLoanId,
)

HistoriesRouter.post('/', dtoValidationMiddleware(CreateHistoryDto), HistoriesController.create)
