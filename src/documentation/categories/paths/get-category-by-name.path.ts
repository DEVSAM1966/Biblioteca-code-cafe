import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { CategoryDtoSchema } from '../schemas/category-dto.schema'

export const GetCategoryByNamePath: OpenAPIV3.PathsObject = {
  '/categories/name/{name}': {
    get: {
      tags: ['Categories'],
      summary: 'Get category by name',
      description: 'Searches for categories by name (case-insensitive partial match)',
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'Category name or part of the name to search for',
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
          description: 'A list of matching categories',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: CategoryDtoSchema,
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
                example: 'Failed to search for categories',
              }),
            },
          },
        },
      },
    },
  },
}
