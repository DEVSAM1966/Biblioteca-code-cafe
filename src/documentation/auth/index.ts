import { LoginAuthPath } from './paths/login.path'
import { RegisterAuthPath } from './paths/register.path'
import { LoginDtoSchema } from './schemas/login-dto.schema'
import { RegisterDtoSchema } from './schemas/register-dto.schema'
import { SignDtoSchema } from './schemas/sign-dto.schema'

export const AuthDocumentation = {
  paths: {
    ...RegisterAuthPath,
    ...LoginAuthPath,
  },
  schemas: {
    RegisterDtoSchema,
    LoginDtoSchema,
    SignDtoSchema,
  },
}
