import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const DeleteHistoriesByLoanPath: OpenAPIV3.PathsObject = {
  '/histories/loan/{id}': {
    delete: {
      tags: ['Histories'],
      summary: 'Delete all history records by loanId',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'Loan identifier to delete associated histories',
        },
      ],
      responses: {
        200: {
          description: 'Histories successfully deleted',
          content: {
            'application/json': {
              schema: SuccesfulResponse({ type: 'boolean' }),
              example: { data: true, timestamp: '2025-12-01T21:25:00.000Z' },
            },
          },
        },
        404: {
          description: 'No histories found for loanId',
          content: {
            'application/json': {
              schema: FailureResponse({ type: 'string' }),
              example: 'No histories found for loanId 99',
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: FailureResponse({ type: 'string' }),
              example: 'Failed to delete histories by loanId',
            },
          },
        },
      },
    },
  },
}
