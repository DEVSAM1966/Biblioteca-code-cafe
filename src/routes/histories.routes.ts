import { Router } from 'express'
import { HistoriesController } from '../controllers/histories.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { HistoryIdParamDto } from '../dtos/in/history-id.dto'
import { CreateHistoryDto } from '../dtos/in/create-history.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '@prisma/client'

export const HistoriesRouter = Router()

HistoriesRouter.get(
  '/',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  HistoriesController.getAll,
)

HistoriesRouter.get(
  '/loan/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  dtoValidationMiddleware(HistoryIdParamDto, 'params'),
  HistoriesController.getByLoanId,
)

HistoriesRouter.post(
  '/',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  dtoValidationMiddleware(CreateHistoryDto),
  HistoriesController.create,
)

HistoriesRouter.delete(
  '/id/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(HistoryIdParamDto, 'params'),
  HistoriesController.deleteById,
)

HistoriesRouter.delete(
  '/loan/:id',
  authMiddleware(UserRole.ADMIN),
  dtoValidationMiddleware(HistoryIdParamDto, 'params'),
  HistoriesController.deleteByLoanId,
)
