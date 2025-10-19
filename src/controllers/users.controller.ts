import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { success } from "../utilities/success.utility";
import { UsersService } from "../services/users.service";

export class UsersController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestError("Invalid ID for User");
    }

    const userOutDto = await UsersService.getById(userId);

    response.status(200).json(success(userOutDto));
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const usersOutDto = await UsersService.getAll();

    response.status(200).json(success(usersOutDto));
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const name = request.params.name || request.query.name;

    if (typeof name !== "string" || name.trim().length === 0) {
      throw new BadRequestError("Name is missing");
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      throw new BadRequestError("Name can only contain characters and spaces");
    }

    const userOutDto = await UsersService.getByName(name);

    response.status(200).json(success(userOutDto));
  }
}
