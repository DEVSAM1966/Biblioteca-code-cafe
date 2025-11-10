import { FailureResponse } from "../../schemas/failure-response.schema";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { UserOutDtoSchema } from "../schemas/user-out-dto.users.schema";
import type { OpenAPIV3 } from 'openapi-types';

export const GetUserByIdPath: OpenAPIV3.PathsObject = {
  "/users/id/{id}": {
    get: {
      tags: ['Users'],
      summary: 'Get user by id',
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
      responses: {
        200: {
          description: 'User found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(UserOutDtoSchema)
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
  },
}