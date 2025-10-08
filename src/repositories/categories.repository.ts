import { Category } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class CategoryRepository {
    static async getById(id: number): Promise<Category | null> {
        return await prisma.category.findUnique({ where: {categoryId: id } });
    }

    static async getAll(): Promise<Category[]> {
        return await prisma.category.findMany();
    }

}