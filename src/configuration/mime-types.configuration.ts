import type { BookUploadField } from "../models/book-upload-field.model";

export const allowedMimeTypes: Record<BookUploadField, string[]> = {
  bookCover: ['image/jpeg', 'image/png'],
  bookFile: ['application/pdf', 'application/epub+zip'],
}
