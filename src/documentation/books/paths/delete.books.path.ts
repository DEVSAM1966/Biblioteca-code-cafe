import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const DeleteBookPath: OpenAPIV3.PathsObject = {
  "/books/{isbn}": {
    delete: {
      tags: ["Books"],
      summary: "Delete a book by ISBN",
      description: "Deletes a book by its ISBN. If the book has associated files (cover image, book file), " +
                  "they will be deleted from the file system if present. If the files were already removed " +
                  "externally, the service logs a warning but continues gracefully.",
      parameters: [
        {
          name: "isbn",
          in: "path",
          required: true,
          description: "ISBN of the book to delete",
          schema: {
            type: "string",
            minLength: 10,
            maxLength: 13,
            pattern: "^\\d+$",
            example: "9786420651361"
          }
        },
        {
          name: "force",
          in: "query",
          description: "Force deletion even if the book has active loans",
          schema: {
            type: "boolean",
            default: false
          }
        },
        {
          name: "deleteFiles",
          in: "query",
          description: "Whether to delete associated files (cover, book file)",
          schema: {
            type: "boolean",
            default: true
          }
        }
      ],
      responses: {
        200: {
          description: "Book successfully deleted",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "object",
                properties: {
                  deleted: {
                    type: "boolean",
                    example: true
                  },
                  isbn: {
                    type: "string",
                    example: "9786420651361"
                  },
                  filesDeleted: {
                    type: "object",
                    properties: {
                      cover: { type: "boolean" },
                      bookFile: { type: "boolean" }
                    }
                  }
                }
              })
            }
          }
        },
        400: {
          description: "Bad Request - Invalid ISBN format",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid ISBN format"
              }),
              examples: {
                invalidFormat: {
                  value: {
                    error: "ISBN must be 10 or 13 digits",
                    timestamp: new Date().toISOString()
                  }
                },
                notNumeric: {
                  value: {
                    error: "ISBN can only contain numbers",
                    timestamp: new Date().toISOString()
                  }
                }
              }
            }
          }
        },
        403: {
          description: "Forbidden - Book cannot be deleted due to active loans",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Cannot delete book with active loans. Set force=true to override"
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
                example: "Book with ISBN 9786420651361 not found"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to delete book",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to delete book with ISBN 9786420651361"
              })
            }
          }
        }
      }
    }
  }
};
