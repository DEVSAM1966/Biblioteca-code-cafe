import type { Request, Response } from 'express'
import { LoansService } from '../services/loans.service'
import { success } from '../utilities/success.utility'
import type { LoanIdParamDto } from '../dtos/in/loan-id.dto'
import type { LoanDateDto } from '../dtos/in/loan-date.dto'
import type { LoanIsbnDto } from '../dtos/in/loan-isbn.dto'
import type { LoanUserIdDto } from '../dtos/in/loan-user.dto'
import type { UpdateLoanDto } from '../dtos/in/update-loan.dto'
import type { CreateLoanDto } from '../dtos/in/create-loan.dto'

export class LoansController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as LoanIdParamDto

    const loadOutdto = await LoansService.getById(id)

    response.status(200).json(success(loadOutdto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const loanOutDtos = await LoansService.getAll()

    response.status(200).json(success(loanOutDtos))
  }

  static async getByIsbn(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as LoanIsbnDto

    const loanOutDtos = await LoansService.getByIsbn(id)

    response.status(200).json(success(loanOutDtos))
  }

  static async getByUser(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as LoanUserIdDto

    const loanOutDtos = await LoansService.getByUser(id)

    response.status(200).json(success(loanOutDtos))
  }

  static async getByDate(request: Request, response: Response): Promise<void> {
    const { date } = request.params as unknown as LoanDateDto

    const loanOutDtos = await LoansService.getByDate(date)

    response.status(200).json(success(loanOutDtos))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const dto = request.body as CreateLoanDto

    const createdLoan = await LoansService.create(dto)

    response.status(201).json(success(createdLoan))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as LoanIdParamDto

    const dto = request.body as UpdateLoanDto

    const updatedLoan = await LoansService.update(id, dto)

    response.status(200).json(success(updatedLoan))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as LoanIdParamDto

    const existing = await LoansService.delete(id)

    response.status(200).json(success(existing))
  }

  static async getMyLoans(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' })
        return
      }

      const userId = req.user.id

      const loans = await LoansService.getByUser(userId)

      res.status(200).json(loans)
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message })
        return
      }
      res.status(500).json({ error: 'Unknown error' })
    }
  }
}
