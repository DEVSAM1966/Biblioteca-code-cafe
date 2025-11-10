import type { OpenAPIV3 } from "openapi-types";
import { CreateUserInDtoSchema } from "../schemas/create-in-dto.users.schema";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { UserOutDtoSchema } from "../schemas/user-out-dto.users.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const CreateUserPath: OpenAPIV3.PathsObject = {
  "/users": {
    post: {
      tags: [
        "Users"
      ],
      summary: "Create a new user",
      description: "Adds a new user to the library",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CreateUserInDtoSchema
          }
        }
      },
      responses: {
        201: {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: SuccesfulResponse(UserOutDtoSchema)
            }
          }
        },
        400: {
          description: "Bad Request - Invalid input data",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "User ID must be a number"
              }),
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to create user",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to create user"
              })
            }
          }
        }
      }
    }
  }
}