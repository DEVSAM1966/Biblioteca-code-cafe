import type { OpenAPIV3 } from "openapi-types";

export const CreateAuthorInDtoSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    nameAuthor: {
      type: "string",
      example: "Isaac Asimov"
    }
  }
}