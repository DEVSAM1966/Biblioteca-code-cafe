import type { Prisma, History } from '@prisma/client'
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

  static async create(data: Prisma.HistoryCreateInput): Promise<History> {
    return await prisma.history.create({ data })
  }

  static async deleteById(id: number): Promise<Prisma.BatchPayload> {
    return await prisma.history.deleteMany({
      where: { historyId: id },
    })
  }

  static async deleteByLoanId(loanId: number): Promise<Prisma.BatchPayload> {
    return await prisma.history.deleteMany({
      where: { loanId: loanId },
    })
  }
}
