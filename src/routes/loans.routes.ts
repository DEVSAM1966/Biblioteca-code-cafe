import { Router } from 'express'
import { LoansController } from '../controllers/loans.controller'
import { LoanIdParamDto } from '../dtos/in/loan-id.dto'
import { LoanIsbnDto } from '../dtos/in/loan-isbn.dto'
import { LoanUserIdDto } from '../dtos/in/loan-user.dto'
import { LoanDateDto } from '../dtos/in/loan-date.dto'
import { CreateLoanDto } from '../dtos/in/create-loan.dto'
import { UpdateLoanDto } from '../dtos/in/update-loan.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'

export const LoansRoutes = Router()

LoansRoutes.get(
  '/id/:id',
  dtoValidationMiddleware(LoanIdParamDto, 'params'),
  LoansController.getById,
)

LoansRoutes.get('/', LoansController.getAll)

LoansRoutes.get(
  '/isbn/:id',
  dtoValidationMiddleware(LoanIsbnDto, 'params'),
  LoansController.getByIsbn,
)

LoansRoutes.get(
  '/user/:id',
  dtoValidationMiddleware(LoanUserIdDto, 'params'),
  LoansController.getByUser,
)

LoansRoutes.get(
  '/date/:date',
  dtoValidationMiddleware(LoanDateDto, 'params'),
  LoansController.getByDate,
)

LoansRoutes.post('/', dtoValidationMiddleware(CreateLoanDto), LoansController.create)

LoansRoutes.put(
  '/id/:id',
  dtoValidationMiddleware(LoanIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateLoanDto),
  LoansController.update,
)

LoansRoutes.delete(
  '/id/:id',
  dtoValidationMiddleware(LoanIdParamDto, 'params'),
  LoansController.delete,
)
