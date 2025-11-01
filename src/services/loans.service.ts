import { Loan } from "@prisma/client";
import { NotFoundError } from "../models/errors/not-found.error";
import { InternalServerError } from "../models/errors/internal-server.error";
import { LoanOutDTO } from "../dtos/out/loan.dto";
import { CreateLoanDTO, UpdateLoanDTO } from "../dtos/in/loan.dto";
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

    static async getByIsbn(id: string): Promise<LoanOutDTO[]> {
        const loans = await LoansRepository.getByIsbn(id);

        if (loans.length === 0) {
            throw new NotFoundError(`No loans found for ISBN ${id}`);
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

    static async getByUser(id: number): Promise<LoanOutDTO[]> {
        const loans = await LoansRepository.getByUser(id);

        if (loans.length === 0) {
            throw new NotFoundError(`No loans found for user with id ${id}`);
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

    static async getByDate(date: Date): Promise<LoanOutDTO[]> {
        const loans = await LoansRepository.getByDate(date);

        if (loans.length === 0) {
            throw new NotFoundError(`No loans found for date ${date.toISOString().split("T")[0]}`);
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

    static async create(data: CreateLoanDTO): Promise<LoanOutDTO> {
        try {
            const loan = await LoansRepository.create(data);

            const dto: LoanOutDTO = {
                loanId: loan.loanId,
                loanDate: loan.loanDate ? loan.loanDate.toISOString().split("T")[0] : null,
                returnDate: loan.returnDate ? loan.returnDate.toISOString().split("T")[0] : null,
                isbn: loan.isbn ?? null,
                userId: loan.userId ?? null,
            };

            return dto;
        } catch (error) {
            throw new InternalServerError("Failed to create loan");
        }
    }

    static async update(id: number, data: UpdateLoanDTO): Promise<LoanOutDTO> {
        const existing = await LoansRepository.getById(id);
        
        if (!existing) {
            throw new NotFoundError(`Loan with id ${id} not found`);
        }

        try {
            const updated = await LoansRepository.update(id, data);

            return {
                loanId: updated.loanId,
                loanDate: updated.loanDate ? updated.loanDate.toISOString().split("T")[0] : null,
                returnDate: updated.returnDate ? updated.returnDate.toISOString().split("T")[0] : null,
                isbn: updated.isbn ?? null,
                userId: updated.userId ?? null,
            };
        } catch (error) {
            throw new InternalServerError(`Failed to update loan with id ${id}`);
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const result = await LoansRepository.delete(id);

            if ( result.count === 0) {
                throw new NotFoundError(`Loan with id ${id} not found`);
            }

            return true;
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new InternalServerError(`Failed to delete loan, {cause, error}`);
        }
    }

}