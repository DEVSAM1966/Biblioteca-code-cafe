import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { PublishersService } from "../services/publishers.service";
import { NotFoundError } from "../models/errors/not-found.error";
import { success } from "../utilities/success.utility";

export class PublishersController {
    static async getById(request: Request, response: Response): Promise<void> {

        const { id } = request.params;
        const publisherId = parseInt(id, 10);

        if (isNaN(publisherId) || publisherId <= 0) {
            throw new BadRequestError("Invalid ID for publisher");
        }

        const publisherDTO = await PublishersService.getById(publisherId);

        if (!publisherDTO) {
            throw new NotFoundError(`Publisher with id ${publisherId} not found`);
        }

        response.status(200).json(success(publisherDTO));
    }
}