import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { LoanOutDtoSchema } from "../schemas/loan-out-dto.loans.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetLoansByBookPath: OpenAPIV3.PathsObject = {
  "/loans/book/{bookId}": {
    get: {
      tags: ["Loans"],
      summary: "Get loans by book",
      description: "Retrieves all loans for a specific book",
      parameters: [
        {
          name: "bookId",
          in: "path",
          required: true,
          description: "Book ID to get loans for",
          schema: {
            type: "string"
          }
        },
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
            enum: ["active", "returned", "overdue", "all"],
            default: "all"
          }
        }
      ],
      responses: {
        200: {
          description: "A list of book's loan history",
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
          description: "Bad Request - Invalid book ID or query parameters",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid book ID format"
              })
            }
          }
        },
        404: {
          description: "Book not found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Book not found"
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
                example: "Failed to retrieve book's loan history"
              })
            }
          }
        }
      }
    }
  }
};
