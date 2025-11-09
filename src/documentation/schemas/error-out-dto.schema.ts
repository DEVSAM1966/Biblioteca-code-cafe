import type { OpenAPIV3 } from 'openapi-types';

export const ErrorOutDto: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      example: 'Error message'
    },
    timestamp: {
      type: 'string',
      format: 'date-time',
      example: '2025-10-03T21:55:00.000Z'
    }
  }
}