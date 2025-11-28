import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const GetPrivateBookFilePath: OpenAPIV3.PathsObject = {
  '/books/private/file/{isbn}': {
    get: {
      tags: ['Books'],
      summary: 'Get private book file',
      description:
        'Retrieves the public URL of the book file (PDF). Requires authentication with roles ADMIN, SUPPORT, or USER.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'isbn',
          in: 'path',
          required: true,
          description: 'ISBN of the book to retrieve its file',
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
          description: 'Book file URL found',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'object',
                properties: {
                  fileUrl: {
                    type: 'string',
                    example: 'http://localhost:9800/uploads/file/9780000000001_Foundation.pdf',
                  },
                },
              }),
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
        401: {
          description: 'Unauthorized - Missing or invalid token',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Unauthorized',
              }),
            },
          },
        },
        404: {
          description: 'Book or file not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Book file for ISBN 9780000000001 not found',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to retrieve book file',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to retrieve private book file',
              }),
            },
          },
        },
      },
    },
  },
}
