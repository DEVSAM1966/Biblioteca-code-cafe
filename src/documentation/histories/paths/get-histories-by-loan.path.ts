import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { HistoryDtoSchema } from '../schemas/history-dto.schema'

export const GetHistoriesByLoanPath: OpenAPIV3.PathsObject = {
  '/histories/loan/{loanId}': {
    get: {
      tags: ['Histories'],
      summary: 'Get histories by loanId',
      description: 'Retrieves all history records associated with a specific loan',
      parameters: [
        {
          name: 'loanId',
          in: 'path',
          required: true,
          description: 'Identifier of the loan to filter histories',
          schema: {
            type: 'integer',
            example: 1,
          },
        },
      ],
      responses: {
        200: {
          description: 'A list of histories for the given loan',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: HistoryDtoSchema,
              }),
              example: {
                data: [
                  {
                    historyId: 1,
                    loanId: 1,
                    dateFeedback: '2025-06-20T00:00:00.000Z',
                    feedback: 'Es una novela fabulosa',
                  },
                  {
                    historyId: 2,
                    loanId: 1,
                    dateFeedback: '2025-06-14T00:00:00.000Z',
                    feedback: 'Esta novela de ciencia ficcion es estupenda.',
                  },
                ],
                timestamp: '2025-11-30T22:30:00.000Z',
              },
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid loanId',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid loanId parameter',
              }),
            },
          },
        },
        404: {
          description: 'No histories found for the given loan',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'No histories found for loanId: 1',
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
                example: 'Failed to retrieve histories by loanId',
              }),
            },
          },
        },
      },
    },
  },
}
