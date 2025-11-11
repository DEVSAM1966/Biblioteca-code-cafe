import type { OpenAPIV3 } from "openapi-types";
import { CreatePublisherInDtoSchema } from "../schemas/create-publisher-in-dto.publishers.schema";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { PublisherOutDtoSchema } from "../schemas/publisher-out-dto.publishers.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const CreatePublisherPath: OpenAPIV3.PathsObject = {
  "/publishers": {
    post: {
      tags: ["Publishers"],
      summary: "Create a new publisher",
      description: "Adds a new publisher to the library",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CreatePublisherInDtoSchema,
            examples: {
              "Valid publisher creation": {
                summary: "Valid publisher creation",
                value: {
                  name: "Penguin Random House",
                  address: "1745 Broadway, New York, NY 10019, USA",
                  phone: "+1 212-782-9000",
                  email: "contact@penguinrandomhouse.com"
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: "Publisher successfully created",
          content: {
            "application/json": {
              schema: SuccesfulResponse(PublisherOutDtoSchema)
            }
          }
        },
        400: {
          description: "Bad Request - Invalid input data",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Name is required"
              })
            }
          }
        },
        409: {
          description: "Conflict - Publisher already exists",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Publisher with this name already exists"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to create publisher",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to create publisher"
              })
            }
          }
        }
      }
    }
  }
};
