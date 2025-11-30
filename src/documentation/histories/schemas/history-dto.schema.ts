import type { OpenAPIV3 } from 'openapi-types'

export const HistoryDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    historyId: {
      type: 'integer',
      example: 1,
    },
    loanId: {
      type: 'integer',
      nullable: true,
      example: 1,
    },
    dateFeedback: {
      type: 'string',
      format: 'date',
      nullable: true,
      example: '2025-06-20',
    },
    feedback: {
      type: 'string',
      nullable: true,
      example: 'Es una novela fabulosa',
    },
  },
}
