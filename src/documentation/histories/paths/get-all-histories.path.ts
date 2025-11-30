import type { OpenAPIV3 } from 'openapi-types'
import { SuccesfulResponse } from '../../schemas/successful-response.schema'
import { FailureResponse } from '../../schemas/failure-response.schema'
import { HistoryDtoSchema } from '../schemas/history-dto.schema'

export const GetAllHistoriesPath: OpenAPIV3.PathsObject = {
  '/histories': {
    get: {
      tags: ['Histories'],
      summary: 'Get all histories',
      description: 'Retrieves a list of all history records in the system',
      responses: {
        200: {
          description: 'A list of histories',
          content: {
            'application/json': {
              schema: SuccesfulResponse({
                type: 'array',
                items: HistoryDtoSchema,
              }),
            },
          },
        },
        404: {
          description: 'No histories found',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'There are no records in Histories',
              }),
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'Failed to retrieve histories',
              }),
            },
          },
        },
      },
    },
  },
}
