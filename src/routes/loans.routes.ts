import { Router } from 'express';
import { LoansController } from '../controllers/loans.controller';

export const LoansRoutes = Router();

LoansRoutes.get('/id/:id', LoansController.getById);

LoansRoutes.get('/', LoansController.getAll);

LoansRoutes.get('/isbn/:id', LoansController.getByIsbn);

LoansRoutes.get('/user/:id', LoansController.getByUser);

LoansRoutes.get('/date/:date', LoansController.getByDate);

