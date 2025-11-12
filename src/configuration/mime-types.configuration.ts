import type { UploadField } from '../models/multer-book-upload-field.model'

export const allowedMimeTypes: Record<UploadField, string[]> = {
  bookCover: ['image/jpeg', 'image/png'],
  bookFile: ['application/pdf', 'application/epub+zip'],
}
