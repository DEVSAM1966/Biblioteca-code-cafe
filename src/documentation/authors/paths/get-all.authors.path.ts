import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { AuthorOutDtoSchema } from "../schemas/author-out-dto.authors.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetAllAuthorsPath: OpenAPIV3.PathsObject = {
  "/authors": {
    get: {
      tags: ["Authors"],
      summary: "Get all authors",
      description: "Retrieves a list of all authors in the library",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number for pagination",
          schema: {
            type: "integer",
            minimum: 1,
            default: 1
          }
        },
        {
          name: "limit",
          in: "query",
          description: "Number of items per page",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 10
          }
        }
      ],
      responses: {
        200: {
          description: "A list of authors",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "array",
                items: AuthorOutDtoSchema
              })
            }
          }
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to retrieve authors"
              })
            }
          }
        }
      }
    }
  }
};
