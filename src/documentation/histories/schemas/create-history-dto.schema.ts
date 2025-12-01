import type { OpenAPIV3 } from 'openapi-types'

export const CreateHistoryDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['loanId', 'feedback'],
  properties: {
    loanId: {
      type: 'integer',
      example: 1,
    },
    dateFeedback: {
      type: 'string',
      format: 'date',
      nullable: true,
      example: '2025-07-01',
    },
    feedback: {
      type: 'string',
      minLength: 10,
      maxLength: 255,
      example: 'Novela para pasar el rato o fin de semana.',
    },
  },
}
