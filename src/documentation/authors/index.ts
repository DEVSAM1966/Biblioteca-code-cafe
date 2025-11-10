import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { AuthorOutDtoSchema } from "./schemas/author-out-dto.authors.schema";
import { CreateAuthorInDtoSchema } from "./schemas/create-author-in-dto.authors.schema";

export const AuthorsDocumentation: ModuleDocumentation = {
  paths: {
  },
  schemas: {
    AuthorOutDtoSchema,
    CreateAuthorInDtoSchema,
  }
}