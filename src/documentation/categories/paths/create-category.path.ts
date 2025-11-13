import type { OpenAPIV3 } from 'openapi-types'
import { CreateCategoryDtoSchema } from '../schemas/create-category-dto.schema'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { CategoryDtoSchema } from '../schemas/category-dto.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const CreateCategoryPath: OpenAPIV3.PathsObject = {
  '/categories': {
    post: {
      tags: ['Categories'],
      summary: 'Create a new category',
      description: 'Adds a new category to the library',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateCategoryDtoSchema,
            examples: {
              'Valid category creation': {
                summary: 'Valid category creation',
                value: {
                  name: 'Fiction',
                  description: 'Fictional works including novels and short stories',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Category successfully created',
          content: {
            'application/json': {
              schema: SuccesfulResponse(CategoryDtoSchema),
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid input data',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Name is required',
              }),
            },
          },
        },
        409: {
          description: 'Conflict - Category already exists',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Category with this name already exists',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to create category',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to create category',
              }),
            },
          },
        },
      },
    },
  },
}
