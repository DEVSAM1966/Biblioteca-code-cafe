import type { OpenAPIV3 } from "openapi-types";

export const UpdatePublisherInDtoSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The updated name of the publisher",
      example: "Updated Publisher Name"
    },
    address: {
      type: "string",
      description: "The updated address of the publisher",
      example: "123 Updated St, City, Country"
    },
    phone: {
      type: "string",
      description: "The updated phone number of the publisher",
      example: "+1234567890"
    },
    email: {
      type: "string",
      format: "email",
      description: "The updated email address of the publisher",
      example: "updated.contact@publisher.com"
    }
  },
  minProperties: 1,
  additionalProperties: false
};
