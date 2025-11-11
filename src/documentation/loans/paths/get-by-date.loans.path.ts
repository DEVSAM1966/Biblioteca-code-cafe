import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { LoanOutDtoSchema } from "../schemas/loan-out-dto.loans.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetLoansByDatePath: OpenAPIV3.PathsObject = {
  "/loans/date/{date}": {
    get: {
      tags: ["Loans"],
      summary: "Get loans by date",
      description: "Retrieves all loans for a specific date or date range",
      parameters: [
        {
          name: "date",
          in: "path",
          required: true,
          description: "Date in YYYY-MM-DD format or date range in YYYY-MM-DD/YYYY-MM-DD format",
          schema: {
            type: "string",
            example: "2025-12-01"
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
          name: "type",
          in: "query",
          description: "Type of date to filter by (loanDate, dueDate, returnDate)",
          schema: {
            type: "string",
            enum: ["loanDate", "dueDate", "returnDate"],
            default: "loanDate"
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
          description: "A list of loans for the specified date/range",
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
          description: "Bad Request - Invalid date format or query parameters",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid date format. Use YYYY-MM-DD or YYYY-MM-DD/YYYY-MM-DD"
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
                example: "Failed to retrieve loans by date"
              })
            }
          }
        }
      }
    }
  }
};
