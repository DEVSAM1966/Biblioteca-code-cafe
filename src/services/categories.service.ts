import { Category } from "@prisma/client";
import { CategoryOutDto } from "../dtos/out/category.dto";
import { CreateCategoryDto } from "../dtos/in/category.dto";
import { NotFoundError } from "../models/errors/not-found.error";
import { CategoryRepository } from "../repositories/categories.repository";
import { InternalServerError } from "../models/errors/internal-server.error";

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

    static async getByName(name: string): Promise<CategoryOutDto[]> {
        const categories = await CategoryRepository.getByName(name);

        if (!categories || categories.length === 0) {
            throw new NotFoundError(`No category found with name: ${name}`);
        }

        return categories.map((category: Category) => ({
            categoryId: category.categoryId,
            nameCategory: category.nameCategory,
            subtopicCategory: category.subtopicCategory,
        }));
    }

    static async create(data: CreateCategoryDto): Promise<Category> {
        try {
            return await CategoryRepository.create(data);
        } catch (error) {
            throw new InternalServerError("Failed to create category");
        }
    }

    static async update(id: number, data: CreateCategoryDto): Promise<CategoryOutDto> {
        const existing = await CategoryRepository.getById(id);

        if (!existing) {
            throw new NotFoundError(`Category with id ${id} not found`);
        }

        try {
            const updated = await CategoryRepository.update(id, data);

            return {
                categoryId: updated.categoryId,
                nameCategory: updated.nameCategory,
                subtopicCategory: updated.subtopicCategory,
            };
        } catch (error) {
            throw new InternalServerError("Failed to update category");
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const result = await CategoryRepository.delete(id);

            if (result.count === 0) {
                throw new NotFoundError(`Category with ID ${id} not found`);
            }

            return true;
        } catch (error: any){
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new InternalServerError("Failed to delete category, {cause: error}");
        } 
    }
}
