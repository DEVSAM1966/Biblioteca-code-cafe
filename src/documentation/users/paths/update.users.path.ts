import type { OpenAPIV3 } from 'openapi-types';
import { FailureResponse } from '../../schemas/failure-response.schema';
import { SuccesfulResponse } from '../../schemas/successful-response.schema';
import { UserOutDto } from '../schemas/user-out-dto.users.schema';
import { UpdateUserInDto } from '../schemas/update-in-dto.users.schema';

export const UpdateUserPath: OpenAPIV3.PathsObject = {
  "/users/{id}": {
    put: {
      tags: ['Users'],
      summary: 'Update user',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User id',
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdateUserInDto
          }
        }
      },
      responses: {
        200: {
          description: 'User found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(UserOutDto)
            },
          },
        },
        400: {
          description: 'Invalid id',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid id'
              })
            },
          },
        },
        404: {
          description: 'No user found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'No user found'
              })
            },
          },
        },
      },
    },
  }
}