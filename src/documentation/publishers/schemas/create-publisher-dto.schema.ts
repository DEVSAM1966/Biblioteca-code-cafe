import type { OpenAPIV3 } from 'openapi-types'

export const CreatePublisherDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['publisherId', 'namePublisher'],
  properties: {
    publisherId: {
      type: 'integer',
      example: 101,
    },
    namePublisher: {
      type: 'string',
      maxLength: 100,
      example: 'Editorial Warp Drive',
    },
    address: {
      type: 'string',
      maxLength: 100,
      nullable: true,
      example: 'Calle Estelar 42',
    },
    city: {
      type: 'string',
      maxLength: 40,
      nullable: true,
      example: 'Vinaròs',
    },
    province: {
      type: 'string',
      maxLength: 30,
      nullable: true,
      example: 'Castellón',
    },
    postalCode: {
      type: 'string',
      maxLength: 20,
      nullable: true,
      example: 12500,
    },
    country: {
      type: 'string',
      maxLength: 30,
      nullable: true,
      example: 'España',
    },
    phone: {
      type: 'string',
      maxLength: 16,
      nullable: true,
      example: '+34 964 123 456',
    },
    notes: {
      type: 'string',
      maxLength: 255,
      nullable: true,
      example: 'Distribuye libros técnicos y de ciencia ficción',
    },
  },
}
