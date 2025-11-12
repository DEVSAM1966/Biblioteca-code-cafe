import type { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../models/errors/bad-request.error'
import { getErrorMessage } from '../utilities/get-error-message.utility'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

export function dtoValidationMiddleware(
  dto: { new (): any },
  source: 'body' | 'params' | 'query' = 'body',
) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    try {
      const data = request[source]

      if (!data || Object.keys(data).length === 0) {
        return next(new BadRequestError(`Request ${source} is missing`))
      }

      const dtoObject = plainToInstance(dto, data)
      const errors = await validate(dtoObject)

      if (errors.length > 0) {
        const formattedErrors = errors.map(({ property, constraints }) => ({
          property,
          messages: constraints ? Object.values(constraints) : [],
        }))

        return next(new BadRequestError(formattedErrors))
      }

      request[source] = dtoObject
      next()
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      return next(new BadRequestError(errorMessage))
    }
  }
}
