import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { LoanOutDtoSchema } from "../schemas/loan-out-dto.loans.schema";
import { UpdateLoanInDtoSchema } from "../schemas/update-loan-in-dto.loans.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const UpdateLoanPath: OpenAPIV3.PathsObject = {
  "/loans/{id}": {
    put: {
      tags: ["Loans"],
      summary: "Update a loan",
      description: "Updates an existing loan's information",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID of the loan to update",
          schema: {
            type: "string"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UpdateLoanInDtoSchema,
            examples: {
              "Update return date": {
                summary: "Update loan's return date",
                value: {
                  returnDate: "2025-12-15T00:00:00.000Z"
                }
              },
              "Mark as returned": {
                summary: "Mark loan as returned",
                value: {
                  status: "returned",
                  returnDate: new Date().toISOString()
                }
              },
              "Update status to overdue": {
                summary: "Update loan status to overdue",
                value: {
                  status: "overdue"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Loan updated successfully",
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
                example: "Invalid return date format"
              })
            }
          }
        },
        404: {
          description: "Loan not found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Loan not found"
              })
            }
          }
        },
        409: {
          description: "Conflict - Invalid loan status transition",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Cannot update a returned loan"
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
                example: "Failed to update loan"
              })
            }
          }
        }
      }
    }
  }
};
