import type { History } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration'

export class HistoriesRepository {
  static async getAll(): Promise<History[]> {
    return prisma.history.findMany()
  }

  static async getByLoanId(loanId: number): Promise<History[]> {
    return prisma.history.findMany({
      where: {
        loanId: loanId,
      },
    })
  }
}
