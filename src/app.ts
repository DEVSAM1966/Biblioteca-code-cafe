import express, { json as jsonMiddleware } from "express";
import { PORT } from "./configuration/env.configuration";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import categoryRouter from './routes/category';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/user';
import publisherRouter from './routes/publisher';
import { Router } from 'express';
// Make sure the path is correct and the file exists
import { getUserByName } from './services/userService';

const prisma = new PrismaClient();

const documentationPath = "./src/documentation/main.documentation.yaml";
const router = Router();
const app = express();

SwaggerParser.dereference(documentationPath).then((api) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(api));
  app.use(jsonMiddleware());
  app.use(errorHandlerMiddleware());
  app.use('/categories', categoryRouter);
  app.use('/users', userRouter);
  app.use('/publisher', publisherRouter);

  router.get('/:name', async (req, res) => {
    const name = req.params.name;
    if (!name) return res.status(400).json({ error: 'Nombre requerido' });

    const user = await getUserByName(name);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Si el usuario existe, responde con HTTP 200 y el usuario
    return res.status(200).json(user);
  });

  router.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID de categoría requerido' });

    const category = await prisma.category.findUnique({ where: { id: Number(id) } });
    if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });

    // Si la categoría existe, responde con HTTP 200 y la categoría
    return res.status(200).json(category);
  });

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

export default router;
