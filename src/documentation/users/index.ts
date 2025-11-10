import { GetAllUsersPath } from "./paths/get-all.users.path";
import { GetUserByIdPath } from "./paths/get-by-id.users.path";
import { GetUserByNamePath } from "./paths/get-by-name.users.path";
import { UpdateUserPath } from "./paths/update.users.path";
import { UserOutDtoSchema } from "./schemas/user-out-dto.users.schema";

export const UsersDocumentation = {
  paths: {
    ...GetAllUsersPath,
    ...GetUserByIdPath,
    ...GetUserByNamePath,
    ...UpdateUserPath,
  },
  schemas: {
    UserOutDtoSchema,
  }
};
