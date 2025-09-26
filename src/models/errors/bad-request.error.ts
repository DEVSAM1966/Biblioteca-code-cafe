import { CustomError } from "./custom-error.error";

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message || "Bad Request", 400);
  }
}