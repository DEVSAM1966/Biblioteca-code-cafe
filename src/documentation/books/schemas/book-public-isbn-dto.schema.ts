import type { OpenAPIV3 } from 'openapi-types'

export const BookPublicIsbnDtoSchema: OpenAPIV3.SchemaObject = {
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
    pages: {
      type: 'integer',
      nullable: true,
      example: 320,
    },
    summary: {
      type: 'string',
      nullable: true,
      example: 'Saga galáctica sobre el conocimiento y el poder.',
    },
    editionDate: {
      type: 'string',
      format: 'date',
      nullable: true,
      example: '1951-06-01',
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
    authors: {
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
    namePublisher: {
      type: 'string',
      nullable: true,
      example: 'Gnome Press',
    },
  },
}
