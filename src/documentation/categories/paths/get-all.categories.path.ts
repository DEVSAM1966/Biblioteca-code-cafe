import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { CategoryOutDtoSchema } from "../schemas/category-out-dto.categories.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetAllCategoriesPath: OpenAPIV3.PathsObject = {
  "/categories": {
    get: {
      tags: ["Categories"],
      summary: "Get all categories",
      description: "Retrieves a list of all categories in the library",
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
          description: "A list of categories",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "array",
                items: CategoryOutDtoSchema
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
                example: "Failed to retrieve categories"
              })
            }
          }
        }
      }
    }
  }
};
