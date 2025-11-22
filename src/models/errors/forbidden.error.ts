import { CustomError } from './custom-error.error'

export class ForbiddenError extends CustomError {
    constructor(value?: any) {
        super(value || 'Forbidden Error', 403)
    }
}
