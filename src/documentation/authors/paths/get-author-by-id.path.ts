import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { AuthorDtoSchema } from '../schemas/author-dto.schema'

export const GetAuthorByIdPath: OpenAPIV3.PathsObject = {
  '/authors/{id}': {
    get: {
      tags: ['Authors'],
      summary: 'Get author by ID',
      description: 'Retrieves a specific author by their unique identifier',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Author ID',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Author found',
          content: {
            'application/json': {
              schema: SuccesfulResponse(AuthorDtoSchema),
            },
          },
        },
        404: {
          description: 'Author not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Author not found',
              }),
            },
          },
        },
        400: {
          description: 'Invalid ID format',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Invalid ID format',
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
                example: 'Failed to retrieve author',
              }),
            },
          },
        },
      },
    },
  },
}
