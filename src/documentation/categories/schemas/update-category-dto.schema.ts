import type { OpenAPIV3 } from 'openapi-types'

export const UpdateCategoryDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'The updated name of the category',
      example: 'Science Fiction',
    },
    description: {
      type: 'string',
      description: 'The updated description of the category',
      example: 'Books that explore futuristic concepts and technologies',
    },
  },
  minProperties: 1,
  additionalProperties: false,
}
