import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const configuration = {
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
  },
  apis: ['./routes/*.ts', './models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(configuration);

export { swaggerUi, swaggerSpec };
