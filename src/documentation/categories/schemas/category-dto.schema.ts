import type { OpenAPIV3 } from 'openapi-types'

export const CategoryDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    categoryId: {
      type: 'integer',
      example: 1,
    },
    nameCategory: {
      type: 'string',
      example: 'Ciencia Ficción',
    },
    subtopicCategory: {
      type: 'string',
      nullable: true,
      example: 'Viajes Espaciales',
    },
  },
}
