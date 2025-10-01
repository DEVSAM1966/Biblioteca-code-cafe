import express, { json as jsonMiddleware } from "express";
import { PORT } from "./configuration/env.configuration";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { PublishersRoutes } from "./routes/publishers.routes";
import { AuthorsRoutes } from "./routes/authors.routes";
import { ensureComponents } from "./utilities/ensure-api-components.utility";

const documentationPath = "./src/documentation/main.documentation.yaml";
const app = express();

SwaggerParser.dereference(documentationPath).then((api) => {
  ensureComponents(api);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(api));
  app.use(jsonMiddleware());
  app.use("/authors", AuthorsRoutes);
  app.use("/publishers", PublishersRoutes);
  app.use(errorHandlerMiddleware());

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Docs available on http://localhost:${PORT}/docs`);
  });
});
