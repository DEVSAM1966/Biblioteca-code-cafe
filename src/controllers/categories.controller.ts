import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { CategoriesService } from "../services/categories.service";
import { success } from "../utilities/success.utility";
import { CreateCategoryDto } from "../dtos/in/category.dto"

export class CategoriesController {
    static async getById(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId) || categoryId <= 0) {
            throw new BadRequestError("Invalid ID for Category");
        }

        const categoryOutDto = await CategoriesService.getById(categoryId);

        response.status(200).json(success(categoryOutDto));
    }

    static async getAll(_request: Request, response: Response): Promise<void> {
        const categoryOutDto = await CategoriesService.getAll();

        response.status(200).json(success(categoryOutDto));
    }

    static async getByName(request: Request, response: Response): Promise<void> {
        const name = request.params.name || request.query.name;

        if (typeof name !== "string" || name.trim().length === 0) {
            throw new BadRequestError("Name is missing");
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            throw new BadRequestError("Name can only contain characters and spaces");
        }

        const categoryOutDto = await CategoriesService.getByName(name);

        response.status(200).json(success(categoryOutDto));
    }

    static async create(request: Request, response: Response): Promise<void> {
        const dto = request.body as CreateCategoryDto;

        const createCategory = await CategoriesService.create(dto);

        response.status(201).json(success(createCategory));
    }

    static async update(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId) || categoryId <= 0) {
            throw new BadRequestError("Invalid ID for Category");
        }

        const dto = request.body as CreateCategoryDto;

        const updatedCategory = await CategoriesService.update(categoryId, dto);

        response.status(200).json(success(updatedCategory));
    }

    static async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId) || categoryId <= 0) {
            throw new BadRequestError("Invalid ID for category");
        }

        const existing = await CategoriesService.delete(categoryId);

        response.status(200).json(success(existing));
  }

}