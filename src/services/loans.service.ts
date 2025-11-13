import type { Loan } from '@prisma/client'
import { NotFoundError } from '../models/errors/not-found.error'
import { InternalServerError } from '../models/errors/internal-server.error'
import { LoansRepository } from '../repositories/loans.repository'
import type { LoanDto } from '../dtos/out/loan.dto'
import type { CreateLoanDto } from '../dtos/in/create-loan.dto'
import type { UpdateLoanDto } from '../dtos/in/update-loan.dto'

export class LoansService {
  static async getById(id: number): Promise<LoanDto> {
    const loan = await LoansRepository.getById(id)

    if (!loan) {
      throw new NotFoundError(`Loan with id ${id} not found`)
    }

    const dto: LoanDto = {
      loanId: loan.loanId,
      loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
      returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
      isbn: loan.isbn ?? null,
      userId: loan.userId ?? null,
    }

    return dto
  }

  static async getAll(): Promise<LoanDto[]> {
    const loans: Loan[] = await LoansRepository.getAll()

    if (loans.length === 0) {
      throw new NotFoundError('No loans found')
    }

    const dtos: LoanDto[] = loans.map((loan: Loan) => ({
      loanId: loan.loanId,
      loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
      returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
      isbn: loan.isbn ?? null,
      userId: loan.userId ?? null,
    }))

    return dtos
  }

  static async getByIsbn(id: string): Promise<LoanDto[]> {
    const loans = await LoansRepository.getByIsbn(id)

    if (loans.length === 0) {
      throw new NotFoundError(`No loans found for ISBN ${id}`)
    }

    const dtos: LoanDto[] = loans.map((loan: Loan) => ({
      loanId: loan.loanId,
      loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
      returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
      isbn: loan.isbn ?? null,
      userId: loan.userId ?? null,
    }))

    return dtos
  }

  static async getByUser(id: number): Promise<LoanDto[]> {
    const loans = await LoansRepository.getByUser(id)

    if (loans.length === 0) {
      throw new NotFoundError(`No loans found for user with id ${id}`)
    }

    const dtos: LoanDto[] = loans.map((loan: Loan) => ({
      loanId: loan.loanId,
      loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
      returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
      isbn: loan.isbn ?? null,
      userId: loan.userId ?? null,
    }))

    return dtos
  }

  static async getByDate(date: Date): Promise<LoanDto[]> {
    const loans = await LoansRepository.getByDate(date)

    if (loans.length === 0) {
      throw new NotFoundError(`No loans found for date ${date.toISOString().split('T')[0]}`)
    }

    const dtos: LoanDto[] = loans.map((loan: Loan) => ({
      loanId: loan.loanId,
      loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
      returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
      isbn: loan.isbn ?? null,
      userId: loan.userId ?? null,
    }))

    return dtos
  }

  static async create(data: CreateLoanDto): Promise<LoanDto> {
    try {
      const returnDate = data.returnDate
        ? new Date(data.returnDate)
        : new Date(new Date().setDate(new Date().getDate() + 7))
      const loan = await LoansRepository.create({ ...data, returnDate })

      const dto: LoanDto = {
        loanId: loan.loanId,
        loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
        returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
        isbn: loan.isbn ?? null,
        userId: loan.userId ?? null,
      }

      return dto
    } catch {
      throw new InternalServerError('Failed to create loan')
    }
  }

  static async update(id: number, data: UpdateLoanDto): Promise<LoanDto> {
    const existing = await LoansRepository.getById(id)

    if (!existing) {
      throw new NotFoundError(`Loan with id ${id} not found`)
    }

    try {
      const updated = await LoansRepository.update(id, data)

      return {
        loanId: updated.loanId,
        loanDate: updated.loanDate ? updated.loanDate.toISOString().split('T')[0] : null,
        returnDate: updated.returnDate ? updated.returnDate.toISOString().split('T')[0] : null,
        isbn: updated.isbn ?? null,
        userId: updated.userId ?? null,
      }
    } catch {
      throw new InternalServerError(`Failed to update loan with id ${id}`)
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await LoansRepository.delete(id)

      if (result.count === 0) {
        throw new NotFoundError(`Loan with id ${id} not found`)
      }

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(`Failed to delete loan, {cause, error}`)
    }
  }
}
