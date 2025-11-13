import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreateAuthorPath } from './paths/create-author.path'
import { DeleteAuthorPath } from './paths/delete-author.path'
import { GetAllAuthorsPath } from './paths/get-all-authors.path'
import { GetAuthorByIdPath } from './paths/get-author-by-id.path'
import { GetAuthorByNamePath } from './paths/get-author-by-name.path'
import { UpdateAuthorPath } from './paths/update-author.path'
import { AuthorDtoSchema } from './schemas/author-dto.schema'
import { CreateAuthorDtoSchema } from './schemas/create-author-dto.schema'
import { UpdateAuthorDtoSchema } from './schemas/update-author-dto.schema'

export const AuthorsDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreateAuthorPath,
    DeleteAuthorPath,
    GetAllAuthorsPath,
    GetAuthorByIdPath,
    GetAuthorByNamePath,
    UpdateAuthorPath,
  ),
  schemas: {
    AuthorDtoSchema,
    CreateAuthorDtoSchema,
    UpdateAuthorDtoSchema,
  },
}
