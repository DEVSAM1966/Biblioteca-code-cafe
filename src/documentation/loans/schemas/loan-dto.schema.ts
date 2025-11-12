import type { OpenAPIV3 } from 'openapi-types'

export const LoanDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    loanId: {
      type: 'integer',
      example: 1,
    },
    loanDate: {
      type: 'string',
      format: 'date',
      example: '2025-06-01',
    },
    returnDate: {
      type: 'string',
      format: 'date',
      example: '2025-06-15',
    },
    userId: {
      type: 'integer',
      nullable: true,
      example: 2,
    },
    isbn: {
      type: 'string',
      nullable: true,
      example: '9780000000002',
    },
  },
}
