import type { OpenAPIV3 } from 'openapi-types'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { UserDtoSchema } from '../schemas/user-dto.schema'

export const GetUserByNamePath: OpenAPIV3.PathsObject = {
  '/users/name/{name}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by name',
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'User name',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(UserDtoSchema),
            },
          },
        },
        400: {
          description: 'Invalid name',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid name',
              }),
            },
          },
        },
        404: {
          description: 'No user found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'No user found',
              }),
            },
          },
        },
      },
    },
  },
}
