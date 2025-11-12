import { allowedMimeTypes } from '../configuration/mime-types.configuration'
import type { UploadField } from '../models/multer-book-upload-field.model'
import multer from 'multer'

const fileFilter: multer.Options['fileFilter'] = (_request, file, callback) => {
  const field = file.fieldname as UploadField
  const isValid = allowedMimeTypes[field]?.includes(file.mimetype)

  if (!isValid) {
    return callback(new Error(`Unsupported file type for '${field}': ${file.mimetype}`))
  }

  callback(null, true)
}

const storage = multer.memoryStorage()

export const uploadBookFiles = () =>
  multer({
    storage,
    fileFilter,
  }).fields([
    { name: 'bookCover', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 },
  ])
