import { Request, response, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { LoansService } from "../services/loans.service";
import { success } from "../utilities/success.utility";

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

}