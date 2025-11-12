import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreateCategoryPath } from './paths/create-category.path'
import { DeleteCategoryPath } from './paths/delete-category.path'
import { GetAllCategoriesPath } from './paths/get-all-categories.path'
import { GetCategoryByIdPath } from './paths/get-category-by-id.path'
import { GetCategoryByNamePath } from './paths/get-category-by-name.path'
import { UpdateCategoryPath } from './paths/update-category.path'
import { CategoryDtoSchema } from './schemas/category-dto.schema'
import { CreateCategoryDtoSchema } from './schemas/create-category-dto.schema'
import { UpdateCategoryDtoSchema } from './schemas/update-category-dto.schema'

export const CategoriesDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreateCategoryPath,
    DeleteCategoryPath,
    GetAllCategoriesPath,
    GetCategoryByIdPath,
    GetCategoryByNamePath,
    UpdateCategoryPath,
  ),
  schemas: {
    CategoryDtoSchema,
    CreateCategoryDtoSchema,
    UpdateCategoryDtoSchema,
  },
}
