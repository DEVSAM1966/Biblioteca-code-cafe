import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { PublishersService } from "../services/publishers.service";
import { success } from "../utilities/success.utility";

export class PublishersController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const publisherId = parseInt(id, 10);

    if (isNaN(publisherId) || publisherId <= 0) {
      throw new BadRequestError("Invalid ID for publisher");
    }

    const publisherOutDTO = await PublishersService.getById(publisherId);

    response.status(200).json(success(publisherOutDTO));
  }
}
