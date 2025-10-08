import { Category } from "@prisma/client";
import { CategoryOutDto } from "../dtos/out/category.dto";
import { NotFoundError } from "../models/errors/not-found.error";
import { CategoryRepository } from "../repositories/categories.repository";

export class CategoriesService {
    static async getById(id: number): Promise<CategoryOutDto> {
        const category = await CategoryRepository.getById(id);

        if (!category) {
            throw new NotFoundError(`Category with id ${id} not found`);
        }

        return {
            categoryId: category.categoryId,
            nameCategory: category.nameCategory,
            subtopicCategory: category.subtopicCategory,
        };
    }

    static async getAll(): Promise<CategoryOutDto[]> {
        const categories = await CategoryRepository.getAll();

        if (!categories || categories.length === 0) {
            throw new NotFoundError(`There are no records in Categories`);
        }

        return categories.map((category) => ({
            categoryId: category.categoryId,
            nameCategory: category.nameCategory,
            subtopicCategory: category.subtopicCategory,
        }));
    }
}