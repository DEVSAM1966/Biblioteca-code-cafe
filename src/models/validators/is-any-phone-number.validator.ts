import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export function IsAnyPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isAnyPhoneNumber",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== "string") return false;
          const phone = parsePhoneNumberFromString(value);
          return phone ? phone.isValid() : false;
        },
      },
    });
  };
}
