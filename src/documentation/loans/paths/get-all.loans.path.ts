import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { LoanOutDtoSchema } from "../schemas/loan-out-dto.loans.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetAllLoansPath: OpenAPIV3.PathsObject = {
  "/loans": {
    get: {
      tags: ["Loans"],
      summary: "Get all loans",
      description: "Retrieves a list of all loans in the system with pagination",
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
        },
        {
          name: "status",
          in: "query",
          description: "Filter loans by status (active, returned, overdue)",
          schema: {
            type: "string",
            enum: ["active", "returned", "overdue"],
            default: "active"
          }
        }
      ],
      responses: {
        200: {
          description: "A list of loans",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "array",
                items: LoanOutDtoSchema
              })
            }
          }
        },
        400: {
          description: "Bad Request - Invalid query parameters",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid status value"
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
                example: "Failed to retrieve loans"
              })
            }
          }
        }
      }
    }
  }
};
