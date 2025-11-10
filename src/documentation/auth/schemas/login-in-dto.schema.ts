import type { OpenAPIV3 } from 'openapi-types';

export const LoginInDto: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: "jhon-doe@email.com"
    },
    password: {
      type: 'string',
      example: "SECUREpassword123!"
    },
  },
  required: ['email', 'password']
}
