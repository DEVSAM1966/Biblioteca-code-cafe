import type { OpenAPIV3 } from 'openapi-types'

export const RegisterDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    dni: {
      type: 'string',
      example: '12345678',
    },
    address: {
      type: 'string',
      nullable: true,
      example: 'Calle Falsa 123',
    },
    city: {
      type: 'string',
      nullable: true,
      example: 'Buenos Aires',
    },
    province: {
      type: 'string',
      nullable: true,
      example: 'Buenos Aires',
    },
    postalCode: {
      type: 'string',
      nullable: true,
      example: '1000',
    },
    country: {
      type: 'string',
      nullable: true,
      example: 'Argentina',
    },
    phone: {
      type: 'string',
      example: '+54 9 11 1234-5678',
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'jhon-doe@email.com',
    },
    password: {
      type: 'string',
      example: 'SECUREpassword123!',
    },
    fullname: {
      type: 'string',
      example: 'Jhon Doe',
    },
  },
  required: ['dni', 'phone', 'email', 'password', 'fullname'],
}
