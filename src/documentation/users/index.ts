import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { mergePaths } from "../../utilities/merge-path.utility";
import { CreateUserPath } from "./paths/create.users.path";
import { DeleteUserPath } from "./paths/delete.users.path";
import { DropUserPath } from "./paths/drop.users.path";
import { GetAllUsersPath } from "./paths/get-all.users.path";
import { GetUserByIdPath } from "./paths/get-by-id.users.path";
import { GetUserByNamePath } from "./paths/get-by-name.users.path";
import { UpdateUserPath } from "./paths/update.users.path";
import { CreateUserInDtoSchema } from "./schemas/create-in-dto.users.schema";
import { DetailedUserOutDtoSchema } from "./schemas/detailed-user-out-dto.users.schema";
import { UpdateUserInDtoSchema } from "./schemas/update-in-dto.users.schema";
import { UserDropOutDtoSchema } from "./schemas/user-drop-out.users.schema";
import { UserOutDtoSchema } from "./schemas/user-out-dto.users.schema";

export const UsersDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    GetAllUsersPath,
    GetUserByIdPath,
    GetUserByNamePath,
    CreateUserPath,
    UpdateUserPath,
    DeleteUserPath,
    DropUserPath
  ),
  schemas: {
    UserOutDtoSchema,
    CreateUserInDtoSchema,
    DetailedUserOutDtoSchema,
    UpdateUserInDtoSchema,
    UserDropOutDtoSchema,
  }
};
