import { LoginAuthPath } from "./paths/login.auth.path";
import { RegisterAuthPath } from "./paths/register.auth.path";
import { LoginInDto } from "./schemas/login-in-dto.auth.schema";
import { RegisterInDto } from "./schemas/register-in-dto.auth.schema";
import { SignOutDto } from "./schemas/sign-out-dto.auth.schema";

export const AuthDocumentation = {
  paths: {
    ...RegisterAuthPath,
    ...LoginAuthPath,
  },
  schemas: {
    RegisterInDto,
    LoginInDto,
    SignOutDto,
  }
};
