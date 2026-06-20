import type { OpenAPIV3 } from 'openapi-types'
import { CreateAuthorDtoSchema } from '../schemas/create-author-dto.schema'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { AuthorDtoSchema } from '../schemas/author-dto.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'

export const CreateAuthorPath: OpenAPIV3.PathsObject = {
  '/authors': {
    post: {
      tags: ['Authors'],
      summary: 'Create a new author',
      description: 'Adds a new author to the library',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateAuthorDtoSchema,
            examples: {
              'Valid author creation': {
                summary: 'Valid author creation',
                value: {
                  nameAuthor: 'John Doe',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Author successfully created',
          content: {
            'application/json': {
              schema: SuccesfulResponse(AuthorDtoSchema),
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
              examples: {
                missingName: {
                  summary: 'Name is required',
                  value: {
                    error: 'name must be a string',
                    timestamp: '12/10/2025, 00:30:00',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to create author',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to create author',
              }),
              examples: {
                creationFailed: {
                  summary: 'Author creation failed',
                  value: {
                    error: 'Failed to create author',
                    timestamp: '12/10/2025, 00:30:00',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
