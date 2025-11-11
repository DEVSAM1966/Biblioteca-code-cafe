import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { CategoryOutDtoSchema } from "../schemas/category-out-dto.categories.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";
import { UpdateCategoryInDtoSchema } from "../schemas/update-category-in-dto.categories.schema";

export const UpdateCategoryPath: OpenAPIV3.PathsObject = {
  "/categories/{id}": {
    put: {
      tags: ["Categories"],
      summary: "Update a category",
      description: "Updates an existing category's information",
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UpdateCategoryInDtoSchema,
            examples: {
              "Update category": {
                summary: "Update category name and description",
                value: {
                  name: "Updated Category Name",
                  description: "Updated category description"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Category successfully updated",
          content: {
            "application/json": {
              schema: SuccesfulResponse(CategoryOutDtoSchema)
            }
          }
        },
        400: {
          description: "Bad Request - Invalid input data",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Name must be a string"
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
          description: "Conflict - Category with this name already exists",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Category with this name already exists"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to update category",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to update category"
              })
            }
          }
        }
      }
    }
  }
};
