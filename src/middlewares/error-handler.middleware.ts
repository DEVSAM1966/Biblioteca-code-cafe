import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models/errors/custom-error.error';
import { getErrorMessage } from '../utilities/get-error-message.utility';
import { getErrorResponse } from '../utilities/get-error-response.utility';

export function errorHandlerMiddleware() {
  return async (
    error: unknown,
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (response.headersSent) {
      next(error);
      return;
    }

    if (error instanceof CustomError) {
      const errorResponse = getErrorResponse(error.message);

      response.status(error.statusCode).json(errorResponse);
      return;
    }

    const errorMessage = getErrorMessage(error);
    const errorResponse = getErrorResponse(errorMessage);

    response.status(500).json(errorResponse);
  };
}
