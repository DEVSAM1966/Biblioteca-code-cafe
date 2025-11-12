import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { CreateBookDtoSchema } from '../schemas/create-book-dto.schema'
import { BookDtoSchema } from '../schemas/book-dto.schema'

export const CreateBookPath: OpenAPIV3.PathsObject = {
  '/books': {
    post: {
      tags: ['Books'],
      summary: 'Create a new book',
      description: 'Adds a new book to the library. Requires a valid ISBN and associated metadata.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateBookDtoSchema,
            examples: {
              validBook: {
                summary: 'Valid book creation',
                value: {
                  isbn: '9786420651361',
                  title: 'La metamorfosis',
                  summary: 'La transformación de un hombre en un insecto.',
                  pages: 48,
                  editionDate: '2016-11-01',
                  language: 'Español',
                  authors: 'Franz Kafka',
                  authorId: 11,
                  publisherId: 9786,
                  categoryId: 5,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Book successfully created',
          content: {
            'application/json': {
              schema: SuccesfulResponse(BookDtoSchema),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid input data',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'ISBN is required',
              }),
              examples: {
                missingIsbn: {
                  summary: 'ISBN is required',
                  value: {
                    error: 'isbn must be a string',
                    timestamp: new Date().toISOString(),
                  },
                },
                invalidAuthorId: {
                  summary: 'Invalid author ID',
                  value: {
                    error: 'Author with ID 999 not found',
                    timestamp: new Date().toISOString(),
                  },
                },
              },
            },
          },
        },
        409: {
          description: 'Conflict - Book with this ISBN already exists',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Book with ISBN 9786420651361 already exists',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to create book',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to create book',
              }),
            },
          },
        },
      },
    },
  },
}
