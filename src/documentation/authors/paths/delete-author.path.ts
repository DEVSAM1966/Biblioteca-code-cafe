import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const DeleteAuthorPath: OpenAPIV3.PathsObject = {
  '/authors/{id}': {
    delete: {
      tags: ['Authors'],
      summary: 'Delete an author',
      description: 'Deletes an author by their ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Author ID to delete',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Author successfully deleted',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Author deleted successfully',
                  },
                },
              }),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid ID format',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid ID format',
              }),
            },
          },
        },
        404: {
          description: 'Author not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Author not found',
              }),
            },
          },
        },
        409: {
          description: 'Conflict - Author has associated books',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Cannot delete author with associated books',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to delete author',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to delete author',
              }),
            },
          },
        },
      },
    },
  },
}
