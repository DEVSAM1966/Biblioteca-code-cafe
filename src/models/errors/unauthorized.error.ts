import { CustomError } from './custom-error.error';

export class UnauthorizedError extends CustomError {
  constructor(value?: any) {
    super(value || 'Unauthorized', 401);
  }
}
