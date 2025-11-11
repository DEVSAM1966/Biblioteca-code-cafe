import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { mergePaths } from "../../utilities/merge-path.utility";
import { CreateCategoryPath } from "./paths/create.categories.path";
import { DeleteCategoryPath } from "./paths/delete.categories.path";
import { GetAllCategoriesPath } from "./paths/get-all.categories.path";
import { GetCategoryByIdPath } from "./paths/get-by-id.categories.path";
import { GetCategoryByNamePath } from "./paths/get-by-name.categories.path";
import { UpdateCategoryPath } from "./paths/update.categories.path";
import { CategoryOutDtoSchema } from "./schemas/category-out-dto.categories.schema";
import { CreateCategoryInDtoSchema } from "./schemas/create-category-in-dto.categories.schema";
import { UpdateCategoryInDtoSchema } from "./schemas/update-category-in-dto.categories.schema";

export const CategoriesDocumentation: ModuleDocumentation = {
  paths: mergePaths(CreateCategoryPath, DeleteCategoryPath, GetAllCategoriesPath, GetCategoryByIdPath, GetCategoryByNamePath, UpdateCategoryPath),
  schemas: {
    CategoryOutDtoSchema,
    CreateCategoryInDtoSchema,
    UpdateCategoryInDtoSchema
  }
};