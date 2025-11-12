import type { OpenAPIV3 } from "openapi-types";
import { CreateLoanInDtoSchema } from "../schemas/create-loan-in-dto.loans.schemas";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { LoanOutDtoSchema } from "../schemas/loan-out-dto.loans.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const CreateLoanPath: OpenAPIV3.PathsObject = {
  "/loans": {
    post: {
      tags: ["Loans"],
      summary: "Create a new loan",
      description: "Creates a new loan record in the system",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CreateLoanInDtoSchema,
            examples: {
              "Valid loan creation": {
                summary: "Valid loan creation",
                value: {
                  bookId: 1,
                  userId: 1,
                  loanDate: "2025-12-01T10:00:00.000Z",
                  dueDate: "2025-12-15T10:00:00.000Z"
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: "Loan successfully created",
          content: {
            "application/json": {
              schema: SuccesfulResponse(LoanOutDtoSchema)
            }
          }
        },
        400: {
          description: "Bad Request - Invalid input data",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Book ID is required"
              })
            }
          }
        },
        404: {
          description: "Not Found - Book or User not found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Book not found"
              })
            }
          }
        },
        409: {
          description: "Conflict - Book is not available for loan",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Book is already on loan"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to create loan",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to create loan"
              })
            }
          }
        }
      }
    }
  }
};
