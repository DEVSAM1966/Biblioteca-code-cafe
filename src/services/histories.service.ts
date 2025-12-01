import { HistoriesRepository } from '../repositories/histories.repository'
import { NotFoundError } from '../models/errors/not-found.error'
import { InternalServerError } from '../models/errors/internal-server.error'
import type { HistoryDTO } from '../dtos/out/history.dto'
import type { CreateHistoryDto } from '../dtos/in/create-history.dto'
import { LoansRepository } from '../repositories/loans.repository'

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

  static async create(data: CreateHistoryDto): Promise<HistoryDTO> {
    try {
      const loanExists = await LoansRepository.getById(data.loanId)

      if (!loanExists) {
        throw new NotFoundError(`Loan with ID ${data.loanId} does not exist`)
      }

      const history = await HistoriesRepository.create({
        dateFeedback: data.dateFeedback ? new Date(data.dateFeedback) : null,
        feedback: data.feedback,
        loan: {
          connect: { loanId: data.loanId },
        },
      })

      return {
        historyId: history.historyId,
        loanId: history.loanId,
        dateFeedback: history.dateFeedback
          ? history.dateFeedback.toISOString().split('T')[0]
          : null,
        feedback: history.feedback,
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new InternalServerError('Failed to create history record')
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    try {
      const deleteResult = await HistoriesRepository.deleteById(id)

      if (deleteResult.count === 0) {
        throw new NotFoundError(`History with historyId ${id} not found`)
      }

      return true
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to delete history record')
    }
  }

  static async deleteByLoanId(loanId: number): Promise<boolean> {
    try {
      const deleteResult = await HistoriesRepository.deleteByLoanId(loanId)

      if (deleteResult.count === 0) {
        throw new NotFoundError(`No histories found for loanId ${loanId}`)
      }

      return true
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to delete histories by loanId')
    }
  }
}
