import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { LoanDtoSchema } from '../schemas/loan-dto.schema'

export const GetLoanByIdPath: OpenAPIV3.PathsObject = {
  '/loans/{id}': {
    get: {
      tags: ['Loans'],
      summary: 'Get loan by ID',
      description: 'Retrieves a specific loan by its unique identifier',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Loan ID',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Loan found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(LoanDtoSchema),
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
          description: 'Loan not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Loan not found',
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
                example: 'Failed to retrieve loan',
              }),
            },
          },
        },
      },
    },
  },
}
