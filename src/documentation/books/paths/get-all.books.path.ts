import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { BookOutDtoSchema } from "../schemas/book-out-dto.books.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const GetAllBooksPath: OpenAPIV3.PathsObject = {
  "/books": {
    get: {
      tags: ["Books"],
      summary: "Get all books",
      description: "Retrieves a paginated list of all books in the library",
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
          name: "sortBy",
          in: "query",
          description: "Field to sort by (title, author, publicationDate, etc.)",
          schema: {
            type: "string",
            enum: ["title", "author", "publicationDate", "isbn"],
            default: "title"
          }
        },
        {
          name: "order",
          in: "query",
          description: "Sort order (asc or desc)",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "asc"
          }
        },
        {
          name: "search",
          in: "query",
          description: "Search term to filter books by title, author, or ISBN",
          schema: {
            type: "string"
          }
        },
        {
          name: "authorId",
          in: "query",
          description: "Filter books by author ID",
          schema: {
            type: "integer"
          }
        },
        {
          name: "categoryId",
          in: "query",
          description: "Filter books by category ID",
          schema: {
            type: "integer"
          }
        },
        {
          name: "publisherId",
          in: "query",
          description: "Filter books by publisher ID",
          schema: {
            type: "integer"
          }
        },
        {
          name: "availableOnly",
          in: "query",
          description: "Only return books that are currently available for loan",
          schema: {
            type: "boolean",
            default: false
          }
        }
      ],
      responses: {
        200: {
          description: "A paginated list of books",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "array",
                items: BookOutDtoSchema,
                description: "Array of book objects"
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
                example: "Invalid sort field 'invalidField'. Valid fields are: title, author, publicationDate, isbn"
              })
            }
          }
        },
        404: {
          description: "No books found",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "No books found matching the specified criteria"
              }),
              examples: {
                noBooks: {
                  value: {
                    error: "There are no records in Books",
                    timestamp: new Date().toISOString()
                  }
                },
                noMatchingCriteria: {
                  value: {
                    error: "No books found matching the specified search criteria",
                    timestamp: new Date().toISOString()
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to retrieve books",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to retrieve books"
              })
            }
          }
        }
      }
    }
  }
};
