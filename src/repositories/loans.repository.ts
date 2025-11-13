import type { Loan, Prisma } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration'

export class LoansRepository {
  static async getById(id: number): Promise<Loan | null> {
    return await prisma.loan.findUnique({ where: { loanId: id } })
  }

  static async getAll(): Promise<Loan[]> {
    return await prisma.loan.findMany()
  }

  static async getByIsbn(id: string): Promise<Loan[]> {
    return await prisma.loan.findMany({ where: { isbn: id } })
  }

  static async getByUser(id: number): Promise<Loan[]> {
    return await prisma.loan.findMany({ where: { userId: id } })
  }

  static async getByDate(date: Date): Promise<Loan[]> {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    return await prisma.loan.findMany({
      where: {
        loanDate: {
          gte: start,
          lte: end,
        },
      },
    })
  }

  static async create(data: Prisma.LoanCreateInput): Promise<Loan> {
    return await prisma.loan.create({ data })
  }

  static async update(id: number, data: Prisma.LoanUpdateInput): Promise<Loan> {
    return await prisma.loan.update({
      where: { loanId: id },
      data,
    })
  }

  static async delete(id: number): Promise<{ count: number }> {
    return await prisma.loan.deleteMany({ where: { loanId: id } })
  }
}
