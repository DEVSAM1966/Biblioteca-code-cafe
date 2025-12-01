import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { HistoryDtoSchema } from '../schemas/history-dto.schema'
import { CreateHistoryDtoSchema } from '../schemas/create-history-dto.schema'

export const PostHistoryPath: OpenAPIV3.PathsObject = {
  '/histories': {
    post: {
      tags: ['Histories'],
      summary: 'Create a new history record',
      description: 'Creates a new feedback entry associated with a loan',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateHistoryDtoSchema,
            example: {
              loanId: 1,
              dateFeedback: '2025-07-01',
              feedback: 'Novela para pasar el rato o fin de semana.',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'History record successfully created',
          content: {
            'application/json': {
              schema: SuccesfulResponse(HistoryDtoSchema),
              example: {
                data: {
                  historyId: 3,
                  loanId: 1,
                  dateFeedback: '2025-07-01',
                  feedback: 'Novela para pasar el rato o fin de semana.',
                },
                timestamp: '2025-12-01T20:05:00.000Z',
              },
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid input data',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Feedback must be at least 10 characters long',
              }),
            },
          },
        },
        404: {
          description: 'Loan not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Loan with ID 99 does not exist',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to create history record',
              }),
            },
          },
        },
      },
    },
  },
}
