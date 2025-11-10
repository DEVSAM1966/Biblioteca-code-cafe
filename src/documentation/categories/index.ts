import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { CategoryOutDtoSchema } from "./schemas/category-out-dto.categories.schema";
import { CreateCategoryInDtoSchema } from "./schemas/create-category-in-dto.categories.schema";


export const CategoriesDocumentation: ModuleDocumentation = {
  paths: {

  },
  schemas: {
    CategoryOutDtoSchema,
    CreateCategoryInDtoSchema
  }
};