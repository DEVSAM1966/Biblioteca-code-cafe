import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { mergePaths } from "../../utilities/merge-path.utility";
import { CreateBookPath } from "./paths/create.books.path";
import { DeleteBookPath } from "./paths/delete.books.path";
import { GetAllBooksPath } from "./paths/get-all.books.path";
import { GetBookByIsbnPath } from "./paths/get-by-isbn.books.path";
import { GetBooksByTitlePath } from "./paths/get-by-title.books.path";
import { UpdateBookPath } from "./paths/update.books.path";
import { UpdateBookFilesPath } from "./paths/update-files.books.path";
import { BookOutDtoSchema } from "./schemas/book-out-dto.books.schema";
import { CreateBookInDtoSchema } from "./schemas/create-book-in-dto.books.schema";
import { UpdateBookInDtoSchema } from "./schemas/update-book-in-dto.books.schema";

export const BooksDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreateBookPath,
    DeleteBookPath,
    GetAllBooksPath,
    GetBookByIsbnPath,
    GetBooksByTitlePath,
    UpdateBookPath,
    UpdateBookFilesPath
  ),
  schemas: {
    BookOutDtoSchema,
    CreateBookInDtoSchema,
    UpdateBookInDtoSchema
  }
};