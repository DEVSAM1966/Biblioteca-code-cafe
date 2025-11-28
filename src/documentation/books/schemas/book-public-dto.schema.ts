import type { OpenAPIV3 } from 'openapi-types'

export const BookPublicDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    isbn: {
      type: 'string',
      example: '9780000000001',
    },
    title: {
      type: 'string',
      example: 'Fundación',
    },
    language: {
      type: 'string',
      nullable: true,
      example: 'Español',
    },
    bookCover: {
      type: 'string',
      nullable: true,
      example: 'uploads/covers/9780000000001.jpg',
    },
    nameAuthor: {
      type: 'string',
      nullable: true,
      example: 'Isaac Asimov',
    },
    nameCategory: {
      type: 'string',
      nullable: true,
      example: 'Ciencia ficción',
    },
    subtopicCategory: {
      type: 'string',
      nullable: true,
      example: 'Space Opera',
    },
  },
}
