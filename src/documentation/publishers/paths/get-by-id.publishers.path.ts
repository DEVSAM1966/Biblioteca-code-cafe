import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { PublisherOutDtoSchema } from "../schemas/publisher-out-dto.publishers.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetPublisherByIdPath: OpenAPIV3.PathsObject = {
  "/publishers/{id}": {
    get: {
      tags: ["Publishers"],
      summary: "Get publisher by ID",
      description: "Retrieves a specific publisher by its unique identifier",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Publisher ID",
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        200: {
          description: "Publisher found",
          content: {
            "application/json": {
              schema: SuccesfulResponse(PublisherOutDtoSchema)
            }
          }
        },
        404: {
          description: "Publisher not found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Publisher not found"
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
                example: "Failed to retrieve publisher"
              })
            }
          }
        }
      }
    }
  }
};
