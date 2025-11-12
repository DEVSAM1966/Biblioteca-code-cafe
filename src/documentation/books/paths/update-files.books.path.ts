import type { OpenAPIV3 } from "openapi-types";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import { FailureResponse } from "../../schemas/failure-response.schema";

export const UpdateBookFilesPath: OpenAPIV3.PathsObject = {
  "/books/{isbn}/files": {
    put: {
      tags: ["Books"],
      summary: "Update book files",
      description: "Updates the cover and/or file of a book by ISBN. Requires multipart/form-data with valid files. " +
        "If the same files are uploaded again for the same ISBN, the system will overwrite the existing files " +
        "with the new ones. No error is thrown, and the book record is updated with the new file paths.",
      parameters: [
        {
          name: "isbn",
          in: "path",
          required: true,
          description: "ISBN of the book to update files for",
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
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                bookCover: {
                  type: "string",
                  format: "binary",
                  description: "Image file for the book cover (JPEG, PNG, WebP)",
                  nullable: true
                },
                bookFile: {
                  type: "string",
                  format: "binary",
                  description: "Document file for the book content (PDF, EPUB)",
                  nullable: true
                }
              },
              minProperties: 1,
              additionalProperties: false
            },
            encoding: {
              bookCover: {
                contentType: "image/jpeg, image/png, image/webp"
              },
              bookFile: {
                contentType: "application/pdf, application/epub+zip"
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Book files successfully updated",
          content: {
            "application/json": {
              schema: SuccesfulResponse({
                type: "object",
                properties: {
                  isbn: {
                    type: "string",
                    example: "9786420651361"
                  },
                  title: {
                    type: "string",
                    example: "La metamorfosis"
                  },
                  bookCover: {
                    type: "string",
                    format: "uri",
                    example: "/uploads/books/covers/9786420651361.jpg"
                  },
                  bookFile: {
                    type: "string",
                    format: "uri",
                    example: "/uploads/books/files/9786420651361.pdf"
                  },
                  coverAvailable: {
                    type: "boolean",
                    example: true
                  },
                  fileAvailable: {
                    type: "boolean",
                    example: true
                  }
                }
              })
            }
          }
        },
        400: {
          description: "Bad Request - Invalid input",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Invalid file type"
              }),
              examples: {
                invalidIsbn: {
                  value: {
                    error: "Invalid ISBN format",
                    timestamp: new Date().toISOString()
                  }
                },
                missingFiles: {
                  value: {
                    error: "No files provided in request. Expected 'bookCover' and/or 'bookFile'.",
                    timestamp: new Date().toISOString()
                  }
                },
                invalidFileType: {
                  value: {
                    error: "Invalid file type for bookCover. Allowed types: image/jpeg, image/png, image/webp",
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
        413: {
          description: "Payload Too Large - File size exceeds limit",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "File size exceeds the maximum allowed size of 10MB"
              })
            }
          }
        },
        415: {
          description: "Unsupported Media Type",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Unsupported media type 'application/octet-stream'"
              })
            }
          }
        },
        500: {
          description: "Internal Server Error - Failed to update files",
          content: {
            "application/json": {
              schema: FailureResponse({
                type: "string",
                example: "Failed to update book files. Cannot write to uploads directory"
              })
            }
          }
        }
      }
    }
  }
};
