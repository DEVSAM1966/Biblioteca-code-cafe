import { Request, response, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { LoansService } from "../services/loans.service";
import { success } from "../utilities/success.utility";
import { CreateLoanDTO, UpdateLoanDTO } from "../dtos/in/loan.dto";

export class LoansController {
    static async getById(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const loadId = parseInt(id, 10);

        if (isNaN(loadId)) {
            throw new BadRequestError("Invalid ID for loan");
        }

        const loadOutDTO = await LoansService.getById(loadId);

        response.status(200).json(success(loadOutDTO));
    }

    static async getAll(_request: Request, response: Response): Promise<void> {
        const loanOutDtos = await LoansService.getAll();
        
        response.status(200).json(success(loanOutDtos));
    }

    static async getByIsbn(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        if (typeof id !== "string" || id.trim().length === 0) {
            throw new BadRequestError("Invalid ISBN for loan");
        }

        if (!/^\d+$/.test(id)) {
            throw new BadRequestError("Isbn for loan can only contain number");
        }

        const loanOutDtos = await LoansService.getByIsbn(id);

        response.status(200).json(success(loanOutDtos));
    }

    static async getByUser(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const userId = parseInt(id, 10);

        if (isNaN(userId)) {
            throw new BadRequestError("Invalid userId for loan");
        }

        const loanOutDtos = await LoansService.getByUser(userId);

        response.status(200).json(success(loanOutDtos));
    }

    static async getByDate(request: Request, response: Response): Promise<void> {
        const { date } = request.params;
        const loanDate = new Date(date);

        if (isNaN(loanDate.getTime())) {
            throw new BadRequestError("Invalid date for loan");
        }

        const loanOutDtos = await LoansService.getByDate(loanDate);

        response.status(200).json(success(loanOutDtos));
    }

    static async create(request: Request, response: Response): Promise<void> {
        const dto = request.body as CreateLoanDTO;

        const createdLoan = await LoansService.create(dto);

        response.status(201).json(success(createdLoan));
    }

    static async update(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const loanId = parseInt(id, 10);

        if (isNaN(loanId) || loanId <= 0) {
            throw new BadRequestError("Invalid ID for loan");
        }

        const dto = request.body as UpdateLoanDTO;

        const updatedLoan = await LoansService.update(loanId, dto);

        response.status(200).json(success(updatedLoan));
    }

    static async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const loanId = parseInt(id, 10);

        if (isNaN(loanId) || loanId <= 0) {
            throw new BadRequestError("Invalid ID for loan");
        }

        const existing = await LoansService.delete(loanId);

        response.status(200).json(success(existing));
    }

}