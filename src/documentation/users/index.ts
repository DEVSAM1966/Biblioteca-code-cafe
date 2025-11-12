import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreateUserPath } from './paths/create-user.path'
import { DeleteUserPath } from './paths/delete-user.path'
import { DropUserPath } from './paths/drop-user.path'
import { GetAllUsersPath } from './paths/get-all-users.path'
import { GetUserByIdPath } from './paths/get-user-by-id.path'
import { GetUserByNamePath } from './paths/get-user-by-name.path'
import { UpdateUserPath } from './paths/update-user.path'
import { UserDtoSchema } from './schemas/user-dto.schema'
import { DetailedUserDtoSchema } from './schemas/detailed-user-dto.schema'
import { UpdateUserDtoSchema } from './schemas/update-user-dto.schema'
import { CreateUserDtoSchema } from './schemas/create-dto.schema'

export const UsersDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    GetAllUsersPath,
    GetUserByIdPath,
    GetUserByNamePath,
    CreateUserPath,
    UpdateUserPath,
    DeleteUserPath,
    DropUserPath,
  ),
  schemas: {
    UserDtoSchema,
    CreateUserDtoSchema,
    DetailedUserDtoSchema,
    UpdateUserDtoSchema,
  },
}
