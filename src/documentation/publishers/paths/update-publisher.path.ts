import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { PublisherDtoSchema } from '../schemas/publisher-dto.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { UpdatePublisherDtoSchema } from '../schemas/update-publisher-dto.schema'

export const UpdatePublisherPath: OpenAPIV3.PathsObject = {
  '/publishers/{id}': {
    put: {
      tags: ['Publishers'],
      summary: 'Update a publisher',
      description: "Updates an existing publisher's information",
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Publisher ID',
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdatePublisherDtoSchema,
            examples: {
              'Update publisher': {
                summary: 'Update publisher information',
                value: {
                  name: 'Updated Publisher Name',
                  address: '456 Updated St, City, Country',
                  phone: '+1987654321',
                  email: 'updated.contact@publisher.com',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Publisher successfully updated',
          content: {
            'application/json': {
              schema: SuccesfulResponse(PublisherDtoSchema),
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
          description: 'Publisher not found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Publisher not found',
              }),
            },
          },
        },
        409: {
          description: 'Conflict - Publisher with this name already exists',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Publisher with this name already exists',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error - Failed to update publisher',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to update publisher',
              }),
            },
          },
        },
      },
    },
  },
}
