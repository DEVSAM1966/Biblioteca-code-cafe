import type { OpenAPIV3 } from "openapi-types";
import { UserOutDtoSchema } from "../../users/schemas/user-out-dto.users.schema";

export const SignOutDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
    user: UserOutDtoSchema
  },
};
