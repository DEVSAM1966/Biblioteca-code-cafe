import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { BookOutDtoSchema } from "../schemas/book-out-dto.books.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";
import { UpdateBookInDtoSchema } from "../schemas/update-book-in-dto.books.schema";

export const UpdateBookPath: OpenAPIV3.PathsObject = {
  "/books/{isbn}": {
    put: {
      tags: ["Books"],
      summary: "Update an existing book",
      description: "Updates the metadata of a book by its ISBN. Only provided fields will be updated.",
      parameters: [
        {
          name: "isbn",
          in: "path",
          required: true,
          description: "ISBN of the book to update",
          schema: {
            type: "string",
            minLength: 10,
            maxLength: 13,
            pattern: "^\\d+$",
            example: "9786420651361"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UpdateBookInDtoSchema,
            examples: {
              updateTitle: {
                summary: "Update book title",
                value: {
                  title: "La metamorfosis (Edición Especial)",
                  summary: "Nueva edición con prólogo y notas del traductor"
                }
              },
              updateMetadata: {
                summary: "Update book metadata",
                value: {
                  pages: 64,
                  editionDate: "2023-01-15",
                  language: "Español"
                }
              },
              updateRelations: {
                summary: "Update book relations",
                value: {
                  authorId: 11,
                  publisherId: 9786,
                  categoryId: 5
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Book successfully updated",
          content: {
            "application/json": {
              schema: SuccesfulResponse(BookOutDtoSchema)
            }
          }
        },
        400: {
          description: "Bad Request - Invalid input data",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid input data"
              }),
              examples: {
                invalidIsbn: {
                  summary: "Invalid ISBN format",
                  value: {
                    error: "ISBN must be 10 or 13 digits",
                    timestamp: new Date().toISOString()
                  }
                },
                invalidDate: {
                  summary: "Invalid date format",
                  value: {
                    error: "editionDate must be a valid date in YYYY-MM-DD format",
                    timestamp: new Date().toISOString()
                  }
                }
              }
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
        409: {
          description: "Conflict - Duplicate data",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "A book with this ISBN already exists"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to update book",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to update book with ISBN 9786420651361"
              })
            }
          }
        }
      }
    }
  }
};
