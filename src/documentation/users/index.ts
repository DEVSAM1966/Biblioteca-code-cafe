import { GetAllUsersPath } from "./paths/get-all.users.path";
import { GetUserByIdPath } from "./paths/get-by-id.users.path";
import { GetUserByNamePath } from "./paths/get-by-name.users.path";
import { UserOutDto } from "./schemas/user-out-dto.schema";

export const UsersDocumentation = {
  paths: {
    ...GetAllUsersPath,
    ...GetUserByIdPath,
    ...GetUserByNamePath,
  },
  schemas: {
    UserOutDto,
  }
};
