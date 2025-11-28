import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreateBookPath } from './paths/create-book.path'
import { DeleteBookPath } from './paths/delete-book.path'
import { GetAllBooksPath } from './paths/get-all-books.path'
import { GetBookByIsbnPath } from './paths/get-book-by-isbn.path'
import { GetBooksByTitlePath } from './paths/get-book-by-title.path'
import { GetPublicBooksPath } from './paths/get-public-books.path'
import { GetPublicBookByIsbnPath } from './paths/get-public-book-by-isbn.path'
import { GetPrivateBooksPath } from './paths/get-private-books.path'
import { GetPrivateBookByIsbnPath } from './paths/get-private-book-by-isbn.path'
import { GetPrivateBookFilePath } from './paths/get-private-book-file.path'
import { UpdateBookPath } from './paths/update-book.path'
import { UpdateBookFilesPath } from './paths/update-book-files.path'
import { BookDtoSchema } from './schemas/book-dto.schema'
import { CreateBookDtoSchema } from './schemas/create-book-dto.schema'
import { UpdateBookDtoSchema } from './schemas/update-book-dto.schema'
import { BookPublicDtoSchema } from './schemas/book-public-dto.schema'
import { BookPublicIsbnDtoSchema } from './schemas/book-public-isbn-dto.schema'

export const BooksDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreateBookPath,
    DeleteBookPath,
    GetAllBooksPath,
    GetBookByIsbnPath,
    GetBooksByTitlePath,
    GetPublicBooksPath,
    GetPublicBookByIsbnPath,
    GetPrivateBooksPath,
    GetPrivateBookByIsbnPath,
    GetPrivateBookFilePath,
    UpdateBookPath,
    UpdateBookFilesPath,
  ),
  schemas: {
    BookDtoSchema,
    BookPublicDtoSchema,
    BookPublicIsbnDtoSchema,
    CreateBookDtoSchema,
    UpdateBookDtoSchema,
  },
}
