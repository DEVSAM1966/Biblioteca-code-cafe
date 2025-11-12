import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import type { OpenAPIV3 } from 'openapi-types'
import { SignDtoSchema } from '../schemas/sign-dto.schema'
import { LoginDtoSchema } from '../schemas/login-dto.schema'

export const LoginAuthPath: OpenAPIV3.PathsObject = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login a user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: LoginDtoSchema,
          },
        },
      },
      responses: {
        200: {
          description: 'User logged in successfully',
          content: {
            'application/json': {
              schema: SuccesfulResponse(SignDtoSchema),
            },
          },
        },
      },
    },
  },
}
