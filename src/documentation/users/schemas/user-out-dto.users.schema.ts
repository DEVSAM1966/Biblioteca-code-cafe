import type { OpenAPIV3 } from "openapi-types";

export const UserOutDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    userId: {
      type: 'integer',
      example: 123
    },
    registrationDate: {
      type: 'string',
      example: '2025-10-03T21:45:00.000Z'
    },
    userDrop: {
      type: 'boolean',
      example: false
    },
    role: {
      type: 'string',
      example: 'USER'
    },
    fullname: {
      type: 'string',
      example: 'Jhon Doe'
    }
  },
  required: ['userId', 'registrationDate', 'userDrop', 'role', 'fullname']
}