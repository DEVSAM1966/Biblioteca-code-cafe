import { Loan } from "@prisma/client";
import { NotFoundError } from "../models/errors/not-found.error";
import { InternalServerError } from "../models/errors/internal-server.error";
import { LoanOutDTO } from "../dtos/out/loan.dto";
import { LoansRepository } from "../repositories/loans.repository";

export class LoansService {
    static async getById(id: number): Promise<LoanOutDTO> {
        const loan = await LoansRepository.getById(id);

        if (!loan) {
            throw new NotFoundError(`Loan with id ${id} not found`);
        }

        const dto: LoanOutDTO = {
            loanId: loan.loanId,
            loanDate: loan.loanDate ? loan.loanDate.toISOString().split("T")[0] : null,
            returnDate: loan.returnDate ? loan.returnDate.toISOString().split("T")[0] : null,
            isbn: loan.isbn ?? null,
            userId: loan.userId ?? null,
        };

        return dto;

    }

    static async getAll(): Promise<LoanOutDTO[]> {
        const loans: Loan[] = await LoansRepository.getAll();

        if (loans.length === 0) {
            throw new NotFoundError("No loans found");
        }

        const dtos: LoanOutDTO[] = loans.map((loan: Loan) => ({
            loanId: loan.loanId,
            loanDate: loan.loanDate ? loan.loanDate.toISOString().split("T")[0] : null,
            returnDate: loan.returnDate ? loan.returnDate.toISOString().split("T")[0] : null,
            isbn: loan.isbn ?? null,
            userId: loan.userId ?? null,
        }));

        return dtos;
    }

}