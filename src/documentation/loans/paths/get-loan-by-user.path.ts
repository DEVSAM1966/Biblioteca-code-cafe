import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { LoanDtoSchema } from '../schemas/loan-dto.schema'

export const GetLoansByUserPath: OpenAPIV3.PathsObject = {
  '/loans/user/{userId}': {
    get: {
      tags: ['Loans'],
      summary: 'Get loans by user',
      description: 'Retrieves all loans for a specific user',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'User ID to get loans for',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'page',
          in: 'query',
          description: 'Page number for pagination',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1,
          },
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Number of items per page',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10,
          },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter loans by status (active, returned, overdue)',
          schema: {
            type: 'string',
            enum: ['active', 'returned', 'overdue', 'all'],
            default: 'all',
          },
        },
      ],
      responses: {
        200: {
          description: "A list of user's loans",
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: LoanDtoSchema,
              }),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid user ID or query parameters',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid user ID format',
              }),
            },
          },
        },
        404: {
          description: 'User not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'User not found',
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
                example: "Failed to retrieve user's loans",
              }),
            },
          },
        },
      },
    },
  },
}
