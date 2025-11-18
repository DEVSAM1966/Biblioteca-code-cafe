import type { Request, Response } from 'express'
import { CategoriesService } from '../services/categories.service'
import { success } from '../utilities/success.utility'
import type { CategoryIdParamDto } from '../dtos/in/category-id.dto'
import type { CategoryNameDto } from '../dtos/in/category-name.dto'
import type { CreateCategoryDto } from '../dtos/in/create-category.dto'
import type { UpdateCategoryDto } from '../dtos/in/update-category.dto'

export class CategoriesController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as CategoryIdParamDto

    const categoryOutDto = await CategoriesService.getById(id)

    response.status(200).json(success(categoryOutDto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const categoryOutDto = await CategoriesService.getAll()

    response.status(200).json(success(categoryOutDto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params as unknown as CategoryNameDto

    const categoryOutDto = await CategoriesService.getByName(name)

    response.status(200).json(success(categoryOutDto))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const dto = request.body as CreateCategoryDto

    const createCategory = await CategoriesService.create(dto)

    response.status(201).json(success(createCategory))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as CategoryIdParamDto

    const dto = request.body as UpdateCategoryDto

    const updatedCategory = await CategoriesService.update(id, dto)

    response.status(200).json(success(updatedCategory))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params as unknown as CategoryIdParamDto

    const existing = await CategoriesService.delete(id)

    response.status(200).json(success(existing))
  }
}
