import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { PublisherDtoSchema } from '../schemas/publisher-dto.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const GetPublisherByNamePath: OpenAPIV3.PathsObject = {
  '/publishers/name/{name}': {
    get: {
      tags: ['Publishers'],
      summary: 'Get publisher by name',
      description: 'Searches for publishers by name (case-insensitive partial match)',
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'Publisher name or part of the name to search for',
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
          description: 'A list of matching publishers',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: PublisherDtoSchema,
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
                example: 'Failed to search for publishers',
              }),
            },
          },
        },
      },
    },
  },
}
