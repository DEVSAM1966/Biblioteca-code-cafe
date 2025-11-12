import { Router } from 'express';
import { LoansController } from '../controllers/loans.controller';
import { dtoValidationMiddleware } from '../middlewares/OLD-dto-validation.middleware';
import { CreateLoanDTO, UpdateLoanDTO } from '../dtos/in/loan.dto';

export const LoansRoutes = Router();

LoansRoutes.get('/id/:id', LoansController.getById);

LoansRoutes.get('/', LoansController.getAll);

LoansRoutes.get('/isbn/:id', LoansController.getByIsbn);

LoansRoutes.get('/user/:id', LoansController.getByUser);

LoansRoutes.get('/date/:date', LoansController.getByDate);

LoansRoutes.post('/', dtoValidationMiddleware(CreateLoanDTO), LoansController.create);

LoansRoutes.put('/id/:id', dtoValidationMiddleware(UpdateLoanDTO), LoansController.update);

LoansRoutes.delete('/id/:id', LoansController.delete);
