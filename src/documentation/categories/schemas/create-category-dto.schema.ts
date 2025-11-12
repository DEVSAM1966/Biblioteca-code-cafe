import type { OpenAPIV3 } from 'openapi-types'

export const CreateCategoryDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['nameCategory'],
  properties: {
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
