import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/bad-request.error";
import { CategoriesService } from "../services/categories.service";
import { success } from "../utilities/success.utility";

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
}