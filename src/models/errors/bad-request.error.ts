import { CustomError } from './custom-error.error'

export class BadRequestError extends CustomError {
  constructor(value?: any) {
    super(value || 'Bad Request', 400)
  }
}
