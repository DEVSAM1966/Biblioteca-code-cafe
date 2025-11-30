import type { Request, Response } from 'express'
import { HistoriesService } from '../services/histories.service'
import { success } from '../utilities/success.utility'
import type { HistoryIdParamDto } from '../dtos/in/history-id.dto'

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
}
