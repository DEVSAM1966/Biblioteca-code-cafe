import { Router } from 'express';
import { LoansController } from '../controllers/loans.controller';

export const LoansRoutes = Router();

LoansRoutes.get('/id/:id', LoansController.getById);

LoansRoutes.get('/', LoansController.getAll);
