import express, { json as jsonMiddleware } from "express";
import { PORT } from "./configuration/env.configuration";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { PublishersRoutes } from "./routes/publishers.routes";
import { AuthorsRoutes } from "./routes/authors.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { CategoriesRoutes } from "./routes/categories.routes";
import { BooksRoutes } from "./routes/books.routes";
import { UsersRoutes } from "./routes/users.routes";

const documentationPath = "./src/documentation/main.documentation.yaml";
const app = express();

SwaggerParser.dereference(documentationPath).then((document) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));
  app.use(jsonMiddleware());
  app.use("/auth", AuthRoutes);
  app.use("/authors", AuthorsRoutes);
  app.use("/publishers", PublishersRoutes);
  app.use("/categories", CategoriesRoutes);
  app.use("/books", BooksRoutes);
  app.use("/users", UsersRoutes);
  app.use(errorHandlerMiddleware());

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Docs available on http://localhost:${PORT}/docs`);
  });
});
