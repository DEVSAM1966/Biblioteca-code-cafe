import { Loan } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class LoansRepository {
    static async getById(id: number): Promise<Loan | null> {
        return await prisma.loan.findUnique({ where: { loanId: id }      });
    }

    static async getAll(): Promise<Loan[]> {
        return await prisma.loan.findMany();
    }

}