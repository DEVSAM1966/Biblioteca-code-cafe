import { Router } from 'express'
import { LoansController } from '../controllers/loans.controller'
import { LoanIdParamDto } from '../dtos/in/loan-id.dto'
import { LoanIsbnDto } from '../dtos/in/loan-isbn.dto'
import { LoanUserIdDto } from '../dtos/in/loan-user.dto'
import { LoanDateDto } from '../dtos/in/loan-date.dto'
import { CreateLoanDto } from '../dtos/in/create-loan.dto'
import { UpdateLoanDto } from '../dtos/in/update-loan.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '@prisma/client'

export const LoansRoutes = Router()

LoansRoutes.get(
  '/id/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(LoanIdParamDto, 'params'),
  LoansController.getById,
)

LoansRoutes.get('/', authMiddleware(UserRole.ADMIN, UserRole.SUPPORT), LoansController.getAll)

LoansRoutes.get('/me', authMiddleware(), LoansController.getMyLoans)

LoansRoutes.get(
  '/isbn/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(LoanIsbnDto, 'params'),
  LoansController.getByIsbn,
)

LoansRoutes.get(
  '/user/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(LoanUserIdDto, 'params'),
  LoansController.getByUser,
)

LoansRoutes.get(
  '/date/:date',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(LoanDateDto, 'params'),
  LoansController.getByDate,
)

LoansRoutes.post(
  '/',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  dtoValidationMiddleware(CreateLoanDto),
  LoansController.create,
)

LoansRoutes.put(
  '/id/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT),
  dtoValidationMiddleware(LoanIdParamDto, 'params'),
  dtoValidationMiddleware(UpdateLoanDto),
  LoansController.update,
)

LoansRoutes.delete(
  '/id/:id',
  authMiddleware(UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER),
  dtoValidationMiddleware(LoanIdParamDto, 'params'),
  LoansController.delete,
)
