import { Loan } from '@prisma/client';
import { prisma } from '../configuration/prisma.configuration';
import { CreateLoanDTO, UpdateLoanDTO } from '../dtos/in/loan.dto';

export class LoansRepository {
  static async getById(id: number): Promise<Loan | null> {
    return await prisma.loan.findUnique({ where: { loanId: id } });
  }

  static async getAll(): Promise<Loan[]> {
    return await prisma.loan.findMany();
  }

  static async getByIsbn(id: string): Promise<Loan[]> {
    return await prisma.loan.findMany({ where: { isbn: id } });
  }

  static async getByUser(id: number): Promise<Loan[]> {
    return await prisma.loan.findMany({ where: { userId: id } });
  }

  static async getByDate(date: Date): Promise<Loan[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return await prisma.loan.findMany({
      where: {
        loanDate: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  static async create(data: CreateLoanDTO): Promise<Loan> {
    const fechaDevolucion = data.returnDate
      ? new Date(data.returnDate)
      : new Date(new Date().setDate(new Date().getDate() + 7));

    return await prisma.loan.create({
      data: {
        userId: data.userId,
        isbn: data.isbn,
        loanDate: new Date(),
        returnDate: fechaDevolucion,
      },
    });
  }

  static async update(id: number, data: UpdateLoanDTO): Promise<Loan> {
    return await prisma.loan.update({
      where: { loanId: id },
      data: {
        returnDate: data.returnDate ? new Date(data.returnDate) : undefined,
        userId: data.userId,
        isbn: data.isbn,
      },
    });
  }

  static async delete(id: number): Promise<{ count: number }> {
    return await prisma.loan.deleteMany({ where: { loanId: id } });
  }
}
