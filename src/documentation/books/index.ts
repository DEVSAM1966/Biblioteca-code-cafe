import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { BookOutDtoSchema } from "./schemas/book-out-dto.books.schema";
import { CreateBookInDtoSchema } from "./schemas/create-book-in-dto.books.schema";

export const BooksDocumentation: ModuleDocumentation = {
  paths: {

  },
  schemas: {
    BookOutDtoSchema,
    CreateBookInDtoSchema
  }
};