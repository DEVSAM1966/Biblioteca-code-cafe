import type { Loan } from '@prisma/client'
import { NotFoundError } from '../models/errors/not-found.error'
import { InternalServerError } from '../models/errors/internal-server.error'
import { LoansRepository } from '../repositories/loans.repository'
import { BooksRepository } from '../repositories/books.repository'
import { UsersRepository } from '../repositories/users.repository'
import type { LoanDto } from '../dtos/out/loan.dto'
import type { CreateLoanDto } from '../dtos/in/create-loan.dto'
import type { UpdateLoanDto } from '../dtos/in/update-loan.dto'

export class LoansService {
  static async getById(id: number): Promise<LoanDto> {
    const loan = await LoansRepository.getById(id)

    if (!loan) {
      throw new NotFoundError(`Loan with ${id} not found`)
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
      throw new NotFoundError(`There are not records in Loans`)
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
      throw new NotFoundError(`Loan Isbn with ${id} not found`)
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
      throw new NotFoundError(`Loan User with ${id} not found`)
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
      throw new NotFoundError(`Loan Date with ${date.toISOString().split('T')[0]} not found`)
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
      const loanDate = new Date(data.loanDate)
      const returnDate = data.returnDate
        ? new Date(data.returnDate)
        : new Date(loanDate.getTime() + 7 * 24 * 60 * 60 * 1000)

      const existingBook = await BooksRepository.getById(data.isbn)
      if (!existingBook) {
        throw new NotFoundError(`Loan Isbn with ${data.isbn} not found`)
      }

      const existingUser = await UsersRepository.getById(data.userId)
      if (!existingUser) {
        throw new NotFoundError(`Loan User with ${data.userId} not found`)
      } else {
        if (existingUser.userDrop === true) {
          throw new NotFoundError(
            `User with id ${data.userId} has been dropped and cannot borrow books`,
          )
        }
      }

      const loan = await LoansRepository.create({ ...data, loanDate, returnDate })

      const dto: LoanDto = {
        loanId: loan.loanId,
        loanDate: loan.loanDate ? loan.loanDate.toISOString().split('T')[0] : null,
        returnDate: loan.returnDate ? loan.returnDate.toISOString().split('T')[0] : null,
        isbn: loan.isbn ?? null,
        userId: loan.userId ?? null,
      }

      return dto
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(`Failed to create loan, ${error.message}`)
    }
  }

  static async update(id: number, data: UpdateLoanDto): Promise<LoanDto> {
    const existing = await LoansRepository.getById(id)

    if (!existing) {
      throw new NotFoundError(`Loan with ${id} not found`)
    }

    if (data.isbn !== null && data.isbn !== undefined) {
      const existingBook = await BooksRepository.getById(data.isbn)

      if (!existingBook) {
        throw new NotFoundError(`Loan Isbn with ${data.isbn} not found`)
      }
    }

    if (data.userId !== null && data.userId !== undefined) {
      const existingUser = await UsersRepository.getById(data.userId)

      if (!existingUser) {
        throw new NotFoundError(`Loan User with ${data.userId} not found`)
      }
    }

    try {
      const returnDate = data.returnDate ? new Date(data.returnDate) : undefined

      const updated = await LoansRepository.update(id, {
        ...data,
        returnDate,
      })

      return {
        loanId: updated.loanId,
        loanDate: updated.loanDate ? updated.loanDate.toISOString().split('T')[0] : null,
        returnDate: updated.returnDate ? updated.returnDate.toISOString().split('T')[0] : null,
        isbn: updated.isbn ?? null,
        userId: updated.userId ?? null,
      }
    } catch (error: any) {
      throw new InternalServerError(`Failed to update loan with, ${error.message}`)
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await LoansRepository.delete(id)

      if (result.count === 0) {
        throw new NotFoundError(`Loan with ${id} not found`)
      }

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(`Failed to delete loan, ${error.message}`)
    }
  }
}
