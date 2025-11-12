import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { mergePaths } from "../../utilities/merge-path.utility";
import { CreateAuthorPath } from "./paths/create.authors.path";
import { DeleteAuthorPath } from "./paths/delete.authors.path";
import { GetAllAuthorsPath } from "./paths/get-all.authors.path";
import { GetAuthorByIdPath } from "./paths/get-by-id.authors.path";
import { GetAuthorByNamePath } from "./paths/get-by-name.authors.path";
import { UpdateAuthorPath } from "./paths/update.authors.path";
import { AuthorOutDtoSchema } from "./schemas/author-out-dto.authors.schema";
import { CreateAuthorInDtoSchema } from "./schemas/create-author-in-dto.authors.schema";
import { UpdateAuthorInDtoSchema } from "./schemas/update-in-dto.authors.schema";

export const AuthorsDocumentation: ModuleDocumentation = {
  paths: mergePaths(CreateAuthorPath,
    DeleteAuthorPath,
    GetAllAuthorsPath,
    GetAuthorByIdPath,
    GetAuthorByNamePath,
    UpdateAuthorPath),
  schemas: {
    AuthorOutDtoSchema,
    CreateAuthorInDtoSchema,
    UpdateAuthorInDtoSchema
  }
}