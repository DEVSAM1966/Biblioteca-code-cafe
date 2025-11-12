import type { OpenAPIV3 } from 'openapi-types'

export const AuthorDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    authorId: {
      type: 'integer',
      example: 1,
    },
    nameAuthor: {
      type: 'string',
      example: 'Isaac Asimov',
    },
  },
}
