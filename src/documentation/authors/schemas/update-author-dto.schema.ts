import type { OpenAPIV3 } from 'openapi-types'

export const UpdateAuthorDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    nameAuthor: {
      type: 'string',
      description: 'The updated name of the author',
      example: 'Updated Author Name',
    },
  },
  required: ['nameAuthor'],
}
