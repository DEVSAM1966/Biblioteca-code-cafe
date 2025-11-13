import type { OpenAPIV3 } from 'openapi-types'
import { CreateUserDtoSchema } from '../schemas/create-dto.schema'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { UserDtoSchema } from '../schemas/user-dto.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const CreateUserPath: OpenAPIV3.PathsObject = {
  '/users': {
    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      description: 'Adds a new user to the library',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateUserDtoSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'User successfully created',
          content: {
            'application/json': {
              schema: SuccesfulResponse(UserDtoSchema),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid input data',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'User ID must be a number',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to create user',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to create user',
              }),
            },
          },
        },
      },
    },
  },
}
