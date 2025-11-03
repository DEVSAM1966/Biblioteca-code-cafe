import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { success } from "../utilities/success.utility";
import { UsersService } from "../services/users.service";
import { UserOutDTO } from "../dtos/out/user.dto";
import { CreateUserDto } from "../dtos/in/create-user.dto";
import { UpdateUserDto } from "../dtos/in/update-user.dto";

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

    if (!/^[\p{L}\s]+$/u.test(name)) {
      throw new BadRequestError("Name can only contain characters and spaces");
    }

    const userOutDto = await UsersService.getByName(name);

    response.status(200).json(success(userOutDto));
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    if (typeof id !== "string" || id.trim().length === 0) {
      throw new BadRequestError("Id is missing");
    }

    if (!/^\d+$/.test(id)) {
      throw new BadRequestError("Id can only contain number");
    }

    const idAsNumber = parseInt(id, 10)

    if (isNaN(idAsNumber) || idAsNumber <= 0) {
      throw new BadRequestError("Invalid ID for User");
    }

    const existing = await UsersService.delete(idAsNumber);

    response.status(200).json(success(existing));
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createUserDto: CreateUserDto = request.body;

    const userOutDto: UserOutDTO = await UsersService.create(createUserDto);

    response.status(201).json(success(userOutDto));
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    if (typeof id !== "string" || id.trim().length === 0) {
      throw new BadRequestError("User Id is missing");
    }

    if (!/^\d+$/.test(id)) {
      throw new BadRequestError("User Id can only contain number");
    }

    const idAsNumber = parseInt(id, 10)

    if (isNaN(idAsNumber) || idAsNumber <= 0) {
      throw new BadRequestError("Invalid ID for User");
    }

    const updateUserDto: UpdateUserDto = request.body;

    const userOutDto: UserOutDTO = await UsersService.update(idAsNumber, updateUserDto);

    response.status(200).json(success(userOutDto));
  }

  static async deleteLogic(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    
    if (typeof id !== "string" || id.trim().length === 0) {
      throw new BadRequestError("User Id is missing");
    }
    if (!/^\d+$/.test(id)) {
      throw new BadRequestError("Id can only contain number");
    }
    const idAsNumber = parseInt(id, 10)

    if (isNaN(idAsNumber) || idAsNumber <= 0) {
      throw new BadRequestError("Invalid ID for User");
    }

    const userDrop = await UsersService.deleteLogic(idAsNumber);

    response.status(200).json(success(userDrop));
  }

}
