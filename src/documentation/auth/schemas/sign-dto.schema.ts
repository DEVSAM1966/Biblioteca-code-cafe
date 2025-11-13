import type { OpenAPIV3 } from 'openapi-types'
import { UserDtoSchema } from '../../users/schemas/user-dto.schema'

export const SignDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    authorization: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
    user: UserDtoSchema,
  },
}
