import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreateLoanPath } from './paths/create-loan.path'
import { DeleteLoanPath } from './paths/delete-loan.path'
import { GetAllLoansPath } from './paths/get-all-loans.path'
import { GetLoansByBookPath } from './paths/get-loan-by-book.path'
import { GetLoansByDatePath } from './paths/get-loan-by-date.path'
import { GetLoanByIdPath } from './paths/get-loan-by-id.path'
import { GetLoansByUserPath } from './paths/get-loan-by-user.path'
import { UpdateLoanPath } from './paths/update-loan.path'
import { CreateLoanDtoSchema } from './schemas/create-loan-dto.schema'
import { LoanDtoSchema } from './schemas/loan-dto.schema'
import { UpdateLoanDtoSchema } from './schemas/update-loan-dto.schema'

export const LoansDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreateLoanPath,
    DeleteLoanPath,
    GetAllLoansPath,
    GetLoanByIdPath,
    GetLoansByBookPath,
    GetLoansByDatePath,
    GetLoansByUserPath,
    UpdateLoanPath,
  ),
  schemas: {
    CreateLoanDtoSchema,
    LoanDtoSchema,
    UpdateLoanDtoSchema,
  },
}
