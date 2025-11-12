import type { OpenAPIV3 } from 'openapi-types'

export const SuccesfulResponse = (value: OpenAPIV3.SchemaObject): OpenAPIV3.SchemaObject => ({
  type: 'object',
  properties: {
    value,
    timestamp: {
      type: 'string',
      format: 'date-time',
      example: '2025-10-03T21:55:00.000Z',
    },
  },
})
