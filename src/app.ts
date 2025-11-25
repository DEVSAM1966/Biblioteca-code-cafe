import 'reflect-metadata'
import express, { json as jsonMiddleware } from 'express'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { PublishersRoutes } from './routes/publishers.routes'
import { AuthorsRoutes } from './routes/authors.routes'
import { AuthRoutes } from './routes/auth.routes'
import { CategoriesRoutes } from './routes/categories.routes'
import { BooksRoutes } from './routes/books.routes'
import { UsersRoutes } from './routes/users.routes'
import { LoansRoutes } from './routes/loans.routes'
import swaggerUi from 'swagger-ui-express'
import { documentationConfiguration } from './configuration/documentation.configuration'
import { environment } from './configuration/environment.configuration'
import path from 'node:path'

const app = express()

app
  .use('/uploads', express.static(path.join(__dirname, '../uploads')))
  .use(jsonMiddleware())
  .use('/auth', AuthRoutes)
  .use('/authors', AuthorsRoutes)
  .use('/publishers', PublishersRoutes)
  .use('/categories', CategoriesRoutes)
  .use('/books', BooksRoutes)
  .use('/users', UsersRoutes)
  .use('/loans', LoansRoutes)
  .use('/documentation', swaggerUi.serve, swaggerUi.setup(documentationConfiguration))
  .use(errorHandlerMiddleware())

app.listen(environment.port, () => {
  console.log(`🖖 Server available on http://localhost:${environment.port}`)
  console.log(`🖖 Documentation available on http://localhost:${environment.port}/documentation`)
})
