import express, { json as jsonMiddleware } from "express";
import { PORT } from "./configuration/env.configuration";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import categoryRouter from './routes/category';

const documentationPath = "./src/documentation/main.documentation.yaml";
const app = express();

SwaggerParser.dereference(documentationPath).then((api) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(api));
  app.use(jsonMiddleware());
  app.use(errorHandlerMiddleware());
  app.use('/categories', categoryRouter);

  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

}).catch((err) => {
  console.error("Error al cargar la documentación de Swagger:", err);
});
