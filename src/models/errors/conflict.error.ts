import { CustomError } from './custom-error.error';

export class ConflictError extends CustomError {
  constructor(value?: any) {
    super(value || 'Conflict', 409);
  }
}
