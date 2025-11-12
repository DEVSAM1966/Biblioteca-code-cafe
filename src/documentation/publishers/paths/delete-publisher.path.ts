import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const DeletePublisherPath: OpenAPIV3.PathsObject = {
  '/publishers/{id}': {
    delete: {
      tags: ['Publishers'],
      summary: 'Delete a publisher',
      description: 'Deletes a publisher by its ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Publisher ID to delete',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Publisher successfully deleted',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Publisher deleted successfully',
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
          description: 'Publisher not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Publisher not found',
              }),
            },
          },
        },
        409: {
          description: 'Conflict - Publisher has associated books',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Cannot delete publisher with associated books',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to delete publisher',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to delete publisher',
              }),
            },
          },
        },
      },
    },
  },
}
