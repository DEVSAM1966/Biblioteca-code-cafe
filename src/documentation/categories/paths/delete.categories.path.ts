import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const DeleteCategoryPath: OpenAPIV3.PathsObject = {
  "/categories/{id}": {
    delete: {
      tags: ["Categories"],
      summary: "Delete a category",
      description: "Deletes a category by its ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Category ID to delete",
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        200: {
          description: "Category successfully deleted",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Category deleted successfully"
                  }
                }
              })
            }
          }
        },
        400: {
          description: "Bad Request - Invalid ID format",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid ID format"
              })
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
        409: {
          description: "Conflict - Category has associated books",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Cannot delete category with associated books"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to delete category",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to delete category"
              })
            }
          }
        }
      }
    }
  }
};
