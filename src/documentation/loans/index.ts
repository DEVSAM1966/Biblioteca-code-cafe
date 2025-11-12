import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { mergePaths } from "../../utilities/merge-path.utility";
import { CreateLoanPath } from "./paths/create.loans.path";
import { DeleteLoanPath } from "./paths/delete.loans.path";
import { GetAllLoansPath } from "./paths/get-all.loans.path";
import { GetLoansByBookPath } from "./paths/get-by-book.loans.path";
import { GetLoansByDatePath } from "./paths/get-by-date.loans.path";
import { GetLoanByIdPath } from "./paths/get-by-id.loans.path";
import { GetLoansByUserPath } from "./paths/get-by-user.loans.path";
import { UpdateLoanPath } from "./paths/update.loans.path";
import { CreateLoanInDtoSchema } from "./schemas/create-loan-in-dto.loans.schemas";
import { LoanOutDtoSchema } from "./schemas/loan-out-dto.loans.schema";
import { UpdateLoanInDtoSchema } from "./schemas/update-loan-in-dto.loans.schema";

export const LoansDocumentation: ModuleDocumentation = {
  paths: mergePaths(CreateLoanPath, DeleteLoanPath, GetAllLoansPath, GetLoanByIdPath, GetLoansByBookPath, GetLoansByDatePath, GetLoansByUserPath, UpdateLoanPath),
  schemas: {
    CreateLoanInDtoSchema,
    LoanOutDtoSchema,
    UpdateLoanInDtoSchema
  }
};