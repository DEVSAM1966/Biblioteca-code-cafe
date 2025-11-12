import { AuthDocumentation } from './auth'
import { UsersDocumentation } from './users'
import { AuthorsDocumentation } from './authors'
import { BooksDocumentation } from './books'
import { LoansDocumentation } from './loans'
import { PublishersDocumentation } from './publishers'
import { CategoriesDocumentation } from './categories'

export const documentation = {
  paths: {
    ...AuthDocumentation.paths,
    ...UsersDocumentation.paths,
    ...AuthorsDocumentation.paths,
    ...BooksDocumentation.paths,
    ...LoansDocumentation.paths,
    ...PublishersDocumentation.paths,
    ...CategoriesDocumentation.paths,
  },
  schemas: {
    ...AuthDocumentation.schemas,
    ...UsersDocumentation.schemas,
    ...AuthorsDocumentation.schemas,
    ...BooksDocumentation.schemas,
    ...LoansDocumentation.schemas,
    ...PublishersDocumentation.schemas,
    ...CategoriesDocumentation.schemas,
  },
}
