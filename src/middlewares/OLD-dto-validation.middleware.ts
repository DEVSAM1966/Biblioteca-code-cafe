import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../models/errors/bad-request.error';
import { getErrorMessage } from '../utilities/get-error-message.utility';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function dtoValidationMiddleware(dto: { new (): any }) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    try {
      if (!request.body) {
        return next(new BadRequestError('Request body is missing'));
      }

      const dtoObject = plainToInstance(dto, request.body);
      const errors = await validate(dtoObject);

      if (errors.length > 0) {
        const formattedErrors = errors.map(({ property, constraints }) => ({
          property,
          messages: constraints ? Object.values(constraints) : [],
        }));

        return next(new BadRequestError(formattedErrors));
      }

      request.body = dtoObject;

      next();
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      return next(new BadRequestError(errorMessage));
    }
  };
}