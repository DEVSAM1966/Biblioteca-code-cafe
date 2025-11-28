import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { BookPublicIsbnDtoSchema } from '../schemas/book-public-isbn-dto.schema'

export const GetPublicBookByIsbnPath: OpenAPIV3.PathsObject = {
  '/books/public/isbn/{isbn}': {
    get: {
      tags: ['Books'],
      summary: 'Get public book by ISBN',
      description: 'Retrieves a single public book by its ISBN',
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
            example: '9780000000001',
          },
        },
      ],
      responses: {
        200: {
          description: 'Book found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(BookPublicIsbnDtoSchema),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid ISBN format',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Book ISBN must be either 10 digits (last can be X) or 13 digits',
              }),
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
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to retrieve book',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to retrieve public book by ISBN',
              }),
            },
          },
        },
      },
    },
  },
}
