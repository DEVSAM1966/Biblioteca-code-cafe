import { HistoriesRepository } from '../repositories/histories.repository'
import { NotFoundError } from '../models/errors/not-found.error'
import { InternalServerError } from '../models/errors/internal-server.error'
import type { HistoryDTO } from '../dtos/out/history.dto'

export class HistoriesService {
  static async getAll(): Promise<HistoryDTO[]> {
    try {
      const histories = await HistoriesRepository.getAll()

      if (histories.length === 0) {
        throw new NotFoundError('There are no records in Histories')
      }

      return histories.map((history) => ({
        historyId: history.historyId,
        loanId: history.loanId,
        dateFeedback: history.dateFeedback?.toISOString() || null,
        feedback: history.feedback,
      }))
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to retrieve histories')
    }
  }

  static async getByLoanId(loanId: number): Promise<HistoryDTO[]> {
    try {
      const histories = await HistoriesRepository.getByLoanId(loanId)

      if (histories.length === 0) {
        throw new NotFoundError(`No histories found for loanId: ${loanId}`)
      }

      return histories.map((history) => ({
        historyId: history.historyId,
        loanId: history.loanId,
        dateFeedback: history.dateFeedback?.toISOString() || null,
        feedback: history.feedback,
      }))
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to retrieve histories by loanId')
    }
  }
}
