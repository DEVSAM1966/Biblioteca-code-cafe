import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { BookDtoSchema } from '../schemas/book-dto.schema'

export const GetBookByIsbnPath: OpenAPIV3.PathsObject = {
  '/books/isbn/{isbn}': {
    get: {
      tags: ['Books'],
      summary: 'Get book by ISBN',
      description: 'Retrieves a single book by its ISBN',
      parameters: [
        {
          name: 'isbn',
          in: 'path',
          required: true,
          description: 'ISBN of the book to retrieve',
          schema: {
            type: 'string',
            minLength: 10,
            maxLength: 13,
            pattern: '^\\d+$',
            example: '9780000000001',
          },
        },
        {
          name: 'includeLoans',
          in: 'query',
          description: 'Include loan history for this book',
          schema: {
            type: 'boolean',
            default: false,
          },
        },
        {
          name: 'includeRelated',
          in: 'query',
          description: 'Include related books by the same author or in the same category',
          schema: {
            type: 'boolean',
            default: false,
          },
        },
      ],
      responses: {
        200: {
          description: 'Book found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(BookDtoSchema),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid ISBN format',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid ISBN format',
              }),
              examples: {
                missing: {
                  summary: 'ISBN is missing',
                  value: {
                    error: 'ISBN is missing',
                    timestamp: new Date().toISOString(),
                  },
                },
                invalid: {
                  summary: 'ISBN contains invalid characters',
                  value: {
                    error: 'ISBN can only contain numbers',
                    timestamp: new Date().toISOString(),
                  },
                },
                invalidLength: {
                  summary: 'Invalid ISBN length',
                  value: {
                    error: 'ISBN must be between 10 and 13 digits',
                    timestamp: new Date().toISOString(),
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Book not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Book with ISBN 9780000000001 not found',
              }),
              examples: {
                notFound: {
                  value: {
                    error: 'Book with ISBN 9780000000001 not found',
                    timestamp: new Date().toISOString(),
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to retrieve book',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to retrieve book with ISBN 9780000000001',
              }),
            },
          },
        },
      },
    },
  },
}
