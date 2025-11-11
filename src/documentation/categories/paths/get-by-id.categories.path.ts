import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { CategoryOutDtoSchema } from "../schemas/category-out-dto.categories.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetCategoryByIdPath: OpenAPIV3.PathsObject = {
  "/categories/{id}": {
    get: {
      tags: ["Categories"],
      summary: "Get category by ID",
      description: "Retrieves a specific category by its unique identifier",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Category ID",
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        200: {
          description: "Category found",
          content: {
            "application/json": {
              schema: SuccesfulResponse(CategoryOutDtoSchema)
            }
          }
        },
        404: {
          description: "Category not found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Category not found"
              })
            }
          }
        },
        400: {
          description: "Invalid ID format",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid ID format"
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
                example: "Failed to retrieve category"
              })
            }
          }
        }
      }
    }
  }
};
