import { LoginAuthPath } from "./paths/login.auth.path";
import { RegisterAuthPath } from "./paths/register.auth.path";
import { LoginInDtoSchema } from "./schemas/login-in-dto.auth.schema";
import { RegisterInDtoSchema } from "./schemas/register-in-dto.auth.schema";
import { SignOutDtoSchema } from "./schemas/sign-out-dto.auth.schema";

export const AuthDocumentation = {
  paths: {
    ...RegisterAuthPath,
    ...LoginAuthPath,
  },
  schemas: {
    RegisterInDtoSchema,
    LoginInDtoSchema,
    SignOutDtoSchema,
  }
};
