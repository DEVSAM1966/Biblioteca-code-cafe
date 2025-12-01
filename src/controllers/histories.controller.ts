import type { Request, Response } from 'express'
import { HistoriesService } from '../services/histories.service'
import { success } from '../utilities/success.utility'
import type { HistoryIdParamDto } from '../dtos/in/history-id.dto'
import type { CreateHistoryDto } from '../dtos/in/create-history.dto'
import type { LoanIdParamDto } from '../dtos/in/loan-id.dto'

export class HistoriesController {
  static async getAll(_request: Request, response: Response): Promise<void> {
    const historiesDto = await HistoriesService.getAll()

    response.status(200).json(success(historiesDto))
  }

  static async getByLoanId(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as HistoryIdParamDto

    const historiesDto = await HistoriesService.getByLoanId(id)

    response.status(200).json(success(historiesDto))
  }
  static async create(request: Request, response: Response): Promise<void> {
    const createHistoryDto = request.body as CreateHistoryDto

    const historyDto = await HistoriesService.create(createHistoryDto)

    response.status(201).json(success(historyDto))
  }

  static async deleteById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as HistoryIdParamDto

    const result = await HistoriesService.deleteById(id)

    response.status(200).json(success(result))
  }

  static async deleteByLoanId(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as LoanIdParamDto

    const result = await HistoriesService.deleteByLoanId(id)

    response.status(200).json(success(result))
  }
}
