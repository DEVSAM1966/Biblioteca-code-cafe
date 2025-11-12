import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const DeleteUserPath: OpenAPIV3.PathsObject = {
  "/users/id/{id}": {
    delete: {
      tags: [
        "Users"
      ],
      summary: "Delete a user by ID",
      description: "Deletes a user by its numeric ID. Returns success if the user was deleted. Throws error if the ID is invalid, the user does not exist, or has related records that prevent deletion.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Numeric ID of the user to delete",
          schema: {
            type: "integer",
            minimum: 1
          }
        }
      ],
      responses: {
        200: {
          description: "User successfully deleted",
          content: {
            "application/json": {
              schema: SuccesfulResponse({ type: "boolean", example: true })
            }
          }
        },
        400: {
          description: "Invalid ID format",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid ID for user"
              })
            }
          }
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "User with ID 123 not found"
              })
            }
          }
        },
        409: {
          description: "Cannot delete user due to related records",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Cannot delete user with id 123 due to existing related records"
              })
            }
          }
        },
        500: {
          description: "Unexpected internal server error",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Unexpected error while deleting user"
              })
            }
          }
        }
      }
    }
  }
}
