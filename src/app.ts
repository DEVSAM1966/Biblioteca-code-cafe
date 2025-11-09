import "reflect-metadata"
import express, { json as jsonMiddleware } from 'express'
import { PORT } from './configuration/env.configuration'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { PublishersRoutes } from './routes/publishers.routes'
import { AuthorsRoutes } from './routes/authors.routes'
import { AuthRoutes } from './routes/auth.routes';
import { CategoriesRoutes } from './routes/categories.routes';
import { BooksRoutes } from './routes/books.routes';
import { UsersRoutes } from './routes/users.routes';
import { LoansRoutes } from './routes/loans.routes';
import swaggerUi from "swagger-ui-express"
import { documentationConfiguration } from './configuration/documentation.configuration';

const app = express();

app
  .use(jsonMiddleware())
  .use('/auth', AuthRoutes)
  .use('/authors', AuthorsRoutes)
  .use('/publishers', PublishersRoutes)
  .use('/categories', CategoriesRoutes)
  .use('/books', BooksRoutes)
  .use('/users', UsersRoutes)
  .use('/loans', LoansRoutes)
  .use('/docs', swaggerUi.serve, swaggerUi.setup(documentationConfiguration))
  .use(errorHandlerMiddleware());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Docs available on http://localhost:${PORT}/docs`);
});