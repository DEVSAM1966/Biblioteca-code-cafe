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
        throw new NotFoundError(`There are not records in Histories`)
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
      throw new InternalServerError(`Failed to retrieve histories`)
    }
  }

  static async getByLoanId(loanId: number): Promise<HistoryDTO[]> {
    try {
      const histories = await HistoriesRepository.getByLoanId(loanId)

      if (histories.length === 0) {
        throw new NotFoundError(`Histories not found for loanId: ${loanId}`)
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
      throw new InternalServerError(`Failed to retrieve histories by loanId`)
    }
  }

  static async create(data: CreateHistoryDto): Promise<HistoryDTO> {
    try {
      const loanExists = await LoansRepository.getById(data.loanId)

      if (!loanExists) {
        throw new NotFoundError(`History Loan with ${data.loanId} not found`)
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
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new InternalServerError(`Failed to create history, ${error.message}`)
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    try {
      const deleteResult = await HistoriesRepository.deleteById(id)

      if (deleteResult.count === 0) {
        throw new NotFoundError(`History with ${id} not found`)
      }

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(`Failed to delete history record, ${error.message}`)
    }
  }

  static async deleteByLoanId(loanId: number): Promise<boolean> {
    try {
      const deleteResult = await HistoriesRepository.deleteByLoanId(loanId)

      if (deleteResult.count === 0) {
        throw new NotFoundError(`History Loan with ${loanId} not found`)
      }

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(`Failed to delete history by loanId, ${error.message}`)
    }
  }
}
