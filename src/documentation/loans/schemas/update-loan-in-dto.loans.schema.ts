import type { OpenAPIV3 } from "openapi-types";

export const UpdateLoanInDtoSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    userId: {
      type: "integer",
      example: 3
    },
    isbn: {
      type: "string",
      example: "9780000000003"
    },
    returnDate: {
      type: "string",
      format: "date",
      example: "2025-06-20"
    }
  }
}