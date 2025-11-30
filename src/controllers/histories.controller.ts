import type { Request, Response } from 'express'
import { HistoriesService } from '../services/histories.service'
import { success } from '../utilities/success.utility'

export class HistoriesController {
  static async getAll(_request: Request, response: Response): Promise<void> {
    const historiesDto = await HistoriesService.getAll()

    response.status(200).json(success(historiesDto))
  }
}
