import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { BookPublicDtoSchema } from '../schemas/book-public-dto.schema'

export const GetPublicBooksPath: OpenAPIV3.PathsObject = {
  '/books/public': {
    get: {
      tags: ['Books'],
      summary: 'Get public books',
      description:
        'Retrieves a paginated list of public books. Supports filters by author and category.',
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page number for pagination',
          schema: {
            type: 'integer',
            default: 1,
            example: 1,
          },
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Number of results per page',
          schema: {
            type: 'integer',
            default: 10,
            example: 5,
          },
        },
        {
          name: 'authorId',
          in: 'query',
          description: 'Filter books by author ID',
          schema: {
            type: 'integer',
            example: 3,
          },
        },
        {
          name: 'categoryId',
          in: 'query',
          description: 'Filter books by category ID',
          schema: {
            type: 'integer',
            example: 2,
          },
        },
      ],
      responses: {
        200: {
          description: 'Books found',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: BookPublicDtoSchema,
              }),
            },
          },
        },
        404: {
          description: 'No books found with the given filters',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'With this select there not are books',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to retrieve books',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to retrieve public books',
              }),
            },
          },
        },
      },
    },
  },
}
