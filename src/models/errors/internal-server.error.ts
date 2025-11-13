import { CustomError } from './custom-error.error'

export class InternalServerError extends CustomError {
  constructor(value?: any) {
    super(value || 'Internal Server Error', 500)
  }
}
