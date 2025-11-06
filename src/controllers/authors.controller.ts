import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { AuthorsService } from "../services/authors.service";
import { success } from "../utilities/success.utility";
import { CreateAuthorDto } from "../dtos/in/create-author.dto";
import { AuthorOutDTO } from "../dtos/out/author.dto";

export class AuthorsController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const authorId = parseInt(id, 10);

    if (isNaN(authorId) || authorId <= 0) {
      throw new BadRequestError("Invalid ID");
    }

    const authorOutDTO = await AuthorsService.getById(authorId);

    response.status(200).json(success(authorOutDTO));
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params;

    if (!name || name.trim().length === 0) {
      throw new BadRequestError("Name is missing");
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      throw new BadRequestError("Name can only contain characters and spaces");
    }

    const authorOutDTO = await AuthorsService.getByName(name);

    response.status(200).json(success(authorOutDTO));
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const authorsOutDTO = await AuthorsService.getAll();

    response.status(200).json(success(authorsOutDTO));
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createAuthorDto: CreateAuthorDto = request.body;

    const authorOutDto: AuthorOutDTO = await AuthorsService.create(createAuthorDto);

    response.status(201).json(success(authorOutDto));
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    if (typeof id !== "string" || id.trim().length === 0) {
      throw new BadRequestError("Id is missing");
    }

    if (!/^\d+$/.test(id)) {
      throw new BadRequestError("Id can only contain number");
    }

    const idAsNumber = parseInt(id, 10);

    const existing = await AuthorsService.delete(idAsNumber);

    response.status(200).json(success(existing));
  }
}
