import swaggerJsdoc from 'swagger-jsdoc';
import path from 'node:path';
import { documentation } from '../documentation/index';

export const documentationConfiguration = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca Code Cafe',
      version: '1.0.0',
      description: 'API Documentation for a team project built by the Code Cafe team',
    },
    servers: [
      {
        url: 'http://localhost:9800/',
        description: 'Local server',
      },
    ],
    components: { schemas: documentation.schemas },
    paths: documentation.paths
  },
  apis: [path.join(__dirname, '../routes/*.{ts,js}')]
});
