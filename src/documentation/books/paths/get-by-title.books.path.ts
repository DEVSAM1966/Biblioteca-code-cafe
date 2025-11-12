import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { BookOutDtoSchema } from "../schemas/book-out-dto.books.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetBooksByTitlePath: OpenAPIV3.PathsObject = {
  "/books/title/{title}": {
    get: {
      tags: ["Books"],
      summary: "Get books by title",
      description: "Searches for books with titles containing the specified text (case-insensitive)",
      parameters: [
        {
          name: "title",
          in: "path",
          required: true,
          description: "Title or part of the title to search for",
          schema: {
            type: "string",
            minLength: 2,
            maxLength: 100,
            example: "metamorphosis"
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
          name: "exactMatch",
          in: "query",
          description: "Whether to search for exact title match (default: false)",
          schema: {
            type: "boolean",
            default: false
          }
        }
      ],
      responses: {
        200: {
          description: "List of books matching the search criteria",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "array",
                items: BookOutDtoSchema,
                description: "Array of book objects matching the title search"
              })
            }
          }
        },
        400: {
          description: "Bad Request - Invalid search criteria",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid title search criteria"
              }),
              examples: {
                missing: {
                  summary: "Title is missing",
                  value: {
                    error: "Title is required",
                    timestamp: new Date().toISOString()
                  }
                },
                tooShort: {
                  summary: "Title too short",
                  value: {
                    error: "Title must be at least 2 characters long",
                    timestamp: new Date().toISOString()
                  }
                },
                invalid: {
                  summary: "Title contains invalid characters",
                  value: {
                    error: "Title contains invalid characters",
                    timestamp: new Date().toISOString()
                  }
                }
              }
            }
          }
        },
        404: {
          description: "No books found with matching title",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "No books found with title containing 'nonexistenttitle'"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to search for books",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to search for books"
              })
            }
          }
        }
      }
    }
  }
};
