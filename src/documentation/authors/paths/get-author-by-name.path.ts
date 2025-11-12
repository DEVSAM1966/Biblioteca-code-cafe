import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { AuthorDtoSchema } from '../schemas/author-dto.schema'

export const GetAuthorByNamePath: OpenAPIV3.PathsObject = {
  '/authors/name/{name}': {
    get: {
      tags: ['Authors'],
      summary: 'Get authors by name',
      description: 'Searches for authors by name (case-insensitive partial match)',
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'Author name or part of the name to search for',
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
      ],
      responses: {
        200: {
          description: 'A list of matching authors',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: AuthorDtoSchema,
              }),
            },
          },
        },
        400: {
          description: 'Invalid request parameters',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Name parameter is required',
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
                example: 'Failed to search for authors',
              }),
            },
          },
        },
      },
    },
  },
}
