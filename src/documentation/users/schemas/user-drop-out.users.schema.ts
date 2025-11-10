import type { OpenAPIV3 } from "openapi-types";

export const UserDropOutSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "User successfully marked as deleted."
    },
    userId: {
      type: "integer",
      example: 123
    },
    userDrop: {
      type: "boolean",
      example: true
    }
  },
  required: [
    "message",
    "userId",
    "userDrop"
  ]
}