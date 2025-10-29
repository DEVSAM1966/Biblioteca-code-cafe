import { Loan } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class LoansRepository {
    static async getById(id: number): Promise<Loan | null> {
        return await prisma.loan.findUnique({ where: { loanId: id }      });
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

}