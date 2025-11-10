import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { CreateLoanInDtoSchema } from "./schemas/create-loan-in-dto.loans.schemas";
import { LoanOutDtoSchema } from "./schemas/loan-out-dto.loans.schema";
import { UpdateLoanInDtoSchema } from "./schemas/update-loan-in-dto.loans.schema";

export const LoansDocumentation: ModuleDocumentation = {
  paths: {

  },
  schemas: {
    CreateLoanInDtoSchema,
    LoanOutDtoSchema,
    UpdateLoanInDtoSchema
  }
};