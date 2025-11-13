import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const DeleteLoanPath: OpenAPIV3.PathsObject = {
  '/loans/{id}': {
    delete: {
      tags: ['Loans'],
      summary: 'Delete a loan',
      description: 'Deletes a loan record by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the loan to delete',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'force',
          in: 'query',
          description: 'Force delete even if there are restrictions',
          required: false,
          schema: {
            type: 'boolean',
            default: false,
          },
        },
      ],
      responses: {
        200: {
          description: 'Loan deleted successfully',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Loan deleted successfully',
                  },
                  loanId: {
                    type: 'string',
                    example: '507f1f77bcf86cd799439011',
                  },
                },
              }),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid loan ID',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid loan ID format',
              }),
            },
          },
        },
        403: {
          description: 'Forbidden - Cannot delete active loan without force flag',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Cannot delete active loan. Set force=true to override',
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
                example: 'Failed to delete loan',
              }),
            },
          },
        },
      },
    },
  },
}
