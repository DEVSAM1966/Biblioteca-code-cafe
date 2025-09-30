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

  static async getByName(request: Request, response: Response): Promise<void> {
    const name = request.params.name || request.query.name;

    if (Array.isArray(name)) {
      throw new BadRequestError("Multiple names not allowed");
    }
    
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new BadRequestError("Name is missing");
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      throw new BadRequestError("Name can only contain characters and spaces");
    }

    const publishersOutDTO = await PublishersService.getByName(name);

    response.status(200).json(success(publishersOutDTO));
  }
}
