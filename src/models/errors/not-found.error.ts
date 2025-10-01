import { CustomError } from "./custom-error.error";

export class NotFoundError extends CustomError {
  constructor(value?: any) {
    super(value || "Not found", 404);
  }
}
