import { LoginAuthPath } from "./paths/login.auth.path";
import { RegisterAuthPath } from "./paths/register.auth.path";
import { LoginInDto } from "./schemas/login-in-dto.schema";
import { RegisterInDto } from "./schemas/register-in-dto.schema";
import { SignOutDto } from "./schemas/sign-out-dto.schema";

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
