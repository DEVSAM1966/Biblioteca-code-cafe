import type { OpenAPIV3 } from 'openapi-types'

export const UpdateBookDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      description: 'The title of the book',
      example: 'La metamorfosis (Edición Especial)',
    },
    summary: {
      type: 'string',
      description: 'A brief summary or description of the book',
      example: 'Nueva edición con prólogo y notas del traductor',
    },
    pages: {
      type: 'integer',
      minimum: 1,
      description: 'Number of pages in the book',
      example: 64,
    },
    editionDate: {
      type: 'string',
      format: 'date',
      description: 'Publication or edition date in YYYY-MM-DD format',
      example: '2023-01-15',
    },
    language: {
      type: 'string',
      description: 'Language of the book',
      example: 'Español',
    },
    authorId: {
      type: 'integer',
      description: "ID of the book's author",
      example: 11,
    },
    publisherId: {
      type: 'integer',
      description: "ID of the book's publisher",
      example: 9786,
    },
    categoryId: {
      type: 'integer',
      description: "ID of the book's category",
      example: 5,
    },
    isAvailable: {
      type: 'boolean',
      description: 'Whether the book is currently available for loan',
      example: true,
    },
    coverImageUrl: {
      type: 'string',
      format: 'uri',
      description: "URL to the book's cover image",
      example: 'https://example.com/covers/9786420651361.jpg',
    },
    metadata: {
      type: 'object',
      description: 'Additional metadata about the book',
      additionalProperties: true,
    },
  },
  minProperties: 1,
  additionalProperties: false,
}
