import { Router } from 'express'
import { HistoriesController } from '../controllers/histories.controller'

export const HistoriesRouter = Router()

HistoriesRouter.get('/', HistoriesController.getAll)
