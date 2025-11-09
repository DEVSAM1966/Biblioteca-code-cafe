import swaggerJsdoc from 'swagger-jsdoc';
import path from 'node:path';
import { schemas } from '../documentation/schemas.documentation';
import { modules } from '../documentation/modules.documentation';

export const documentationConfiguration = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca Code Café',
      version: '1.0.0',
      description: 'Documentación de la API de la biblioteca con Swagger y Express',
    },
    servers: [
      {
        url: 'http://localhost:9800/',
        description: 'Servidor local',
      },
    ],
    components: { schemas },
    paths: modules
  },
  apis: [path.join(__dirname, '../routes/*.{ts,js}')]
});
