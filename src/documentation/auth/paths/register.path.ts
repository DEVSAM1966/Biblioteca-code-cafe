import { FailureResponse } from '../../schemas/failure-response.schema'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import type { OpenAPIV3 } from 'openapi-types'
import { RegisterDtoSchema } from '../schemas/register-dto.schema'
import { SignDtoSchema } from '../schemas/sign-dto.schema'

export const RegisterAuthPath: OpenAPIV3.PathsObject = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: RegisterDtoSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: SuccesfulResponse(SignDtoSchema),
            },
          },
        },
        409: {
          description: 'Conflict - User already exists',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'User already exists',
              }),
            },
          },
        },
      },
    },
  },
}
