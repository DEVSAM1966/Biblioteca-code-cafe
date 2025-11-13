import { FailureResponse } from '../../schemas/failure-response.schema'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import type { OpenAPIV3 } from 'openapi-types'
import { UserDtoSchema } from '../schemas/user-dto.schema'

export const GetAllUsersPath: OpenAPIV3.PathsObject = {
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      responses: {
        200: {
          description: 'Users found',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: UserDtoSchema,
              }),
            },
          },
        },
        404: {
          description: 'No users found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'No users found',
              }),
            },
          },
        },
      },
    },
  },
}
