import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreateBookPath } from './paths/create-book.path'
import { DeleteBookPath } from './paths/delete-book.path'
import { GetAllBooksPath } from './paths/get-all-books.path'
import { GetBookByIsbnPath } from './paths/get-book-by-isbn.path'
import { GetBooksByTitlePath } from './paths/get-book-by-title.path'
import { UpdateBookPath } from './paths/update-book.path'
import { UpdateBookFilesPath } from './paths/update-book-files.path'
import { BookDtoSchema } from './schemas/book-dto.schema'
import { CreateBookDtoSchema } from './schemas/create-book-dto.schema'
import { UpdateBookDtoSchema } from './schemas/update-book-dto.schema'

export const BooksDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreateBookPath,
    DeleteBookPath,
    GetAllBooksPath,
    GetBookByIsbnPath,
    GetBooksByTitlePath,
    UpdateBookPath,
    UpdateBookFilesPath,
  ),
  schemas: {
    BookDtoSchema,
    CreateBookDtoSchema,
    UpdateBookDtoSchema,
  },
}
