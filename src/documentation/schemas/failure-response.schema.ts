import type { OpenAPIV3 } from 'openapi-types'

export const FailureResponse = (error?: OpenAPIV3.SchemaObject): OpenAPIV3.SchemaObject => {
  if (error) {
    return {
      type: 'object',
      properties: {
        error,
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-10-03T21:55:00.000Z',
        },
      },
    }
  } else {
    return {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: 'Error Message',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-10-03T21:55:00.000Z',
        },
      },
    }
  }
}
