import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const DeleteHistoryByIdPath: OpenAPIV3.PathsObject = {
  '/histories/id/{id}': {
    delete: {
      tags: ['Histories'],
      summary: 'Delete a history record by historyId',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'Unique identifier of the history record',
        },
      ],
      responses: {
        200: {
          description: 'History record successfully deleted',
          content: {
            'application/json': {
              schema: SuccesfulResponse({ type: 'boolean' }),
              example: { data: true, timestamp: '2025-12-01T21:25:00.000Z' },
            },
          },
        },
        404: {
          description: 'History record not found',
          content: {
            'application/json': {
              schema: FailureResponse({ type: 'string' }),
              example: 'History with historyId 99 not found',
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: FailureResponse({ type: 'string' }),
              example: 'Failed to delete history record',
            },
          },
        },
      },
    },
  },
}
