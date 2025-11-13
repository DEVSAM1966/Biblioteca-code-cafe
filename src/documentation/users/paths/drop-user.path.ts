import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const DropUserPath: OpenAPIV3.PathsObject = {
  '/users/drop': {
    delete: {
      tags: ['Users'],
      summary: 'Logical delete of a user by ID',
      description:
        'Performs a logical deletion of a user by setting the `userDrop` field to `true`. The user record remains in the database. Returns success if the user was marked as deleted. Throws error if the ID is invalid or the user does not exist.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Numeric ID of the user to logically delete',
          schema: {
            type: 'integer',
            minimum: 1,
          },
        },
      ],
      responses: {
        200: {
          description: 'User successfully marked as deleted',
          content: {
            'application/json': {
              schema: SuccesfulResponse({ type: 'boolean', example: true }),
            },
          },
        },
        400: {
          description: 'Invalid ID format',
          content: {
            'application/json': {
              schema: FailureResponse({ type: 'string', example: 'Invalid ID for user' }),
            },
          },
        },
        404: {
          description: 'User not found',
          content: {
            'application/json': {
              schema: FailureResponse({ type: 'string', example: 'User with ID 123 not found' }),
            },
          },
        },
        409: {
          description: 'User is already marked as deleted',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'User with id 123 is already marked as deleted',
              }),
            },
          },
        },
      },
    },
  },
}
