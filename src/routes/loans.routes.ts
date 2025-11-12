import { Router } from 'express'
import { LoansController } from '../controllers/loans.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateLoanDto } from '../dtos/in/create-loan.dto'
import { UpdateLoanDto } from '../dtos/in/update-loan.dto'

export const LoansRoutes = Router()

LoansRoutes.get('/id/:id', LoansController.getById)

LoansRoutes.get('/', LoansController.getAll)

LoansRoutes.get('/isbn/:id', LoansController.getByIsbn)

LoansRoutes.get('/user/:id', LoansController.getByUser)

LoansRoutes.get('/date/:date', LoansController.getByDate)

LoansRoutes.post('/', dtoValidationMiddleware(CreateLoanDto), LoansController.create)

LoansRoutes.put('/id/:id', dtoValidationMiddleware(UpdateLoanDto), LoansController.update)

LoansRoutes.delete('/id/:id', LoansController.delete)
