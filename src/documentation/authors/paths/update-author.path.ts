import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { AuthorDtoSchema } from '../schemas/author-dto.schema'
import { UpdateAuthorDtoSchema } from '../schemas/update-author-dto.schema'

export const UpdateAuthorPath: OpenAPIV3.PathsObject = {
  '/authors/{id}': {
    put: {
      tags: ['Authors'],
      summary: 'Update an author',
      description: "Updates an existing author's information",
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
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdateAuthorDtoSchema,
            examples: {
              'Update author name': {
                summary: 'Update author name',
                value: {
                  nameAuthor: 'Updated Author Name',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Author successfully updated',
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
                example: 'Name must be a string',
              }),
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
        500: {
          description: 'Internal Server Error - Failed to update author',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to update author',
              }),
            },
          },
        },
      },
    },
  },
}
