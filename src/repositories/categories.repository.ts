import { Category } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";
import { CreateCategoryDto } from "../dtos/in/category.dto";

export class CategoryRepository {
    static async getById(id: number): Promise<Category | null> {
        return await prisma.category.findUnique({ where: {categoryId: id } });
    }

    static async getAll(): Promise<Category[]> {
        return await prisma.category.findMany();
    }

    static async getByName(name: string): Promise<Category[]> {
        return await prisma.category.findMany({
            where: {
                OR: [
                    { nameCategory: { contains: name } }, 
                    { subtopicCategory: { contains: name } },
                ],
            },
        });
    }

    static async create(data: CreateCategoryDto): Promise<Category> {
        return await prisma.category.create({
            data: {
                categoryId: data.categoryId,
                nameCategory: data.nameCategory,
                subtopicCategory: data.subtopicCategory,
            },
        });
    }

    static async update(id: number, data: CreateCategoryDto): Promise<Category> {
        return await prisma.category.update({
            where: { categoryId: id},
            data: {
                nameCategory: data.nameCategory,
                subtopicCategory: data.subtopicCategory,
            },
        });
    }
}