import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { GetAllHistoriesPath } from './paths/get-all-histories.path'
import { GetHistoriesByLoanPath } from './paths/get-histories-by-loan.path'
import { PostHistoryPath } from './paths/post-history.path'
import { HistoryDtoSchema } from './schemas/history-dto.schema'
import { CreateHistoryDtoSchema } from './schemas/create-history-dto.schema'

export const HistoriesDocumentation: ModuleDocumentation = {
  paths: mergePaths(GetAllHistoriesPath, GetHistoriesByLoanPath, PostHistoryPath),
  schemas: {
    HistoryDtoSchema,
    CreateHistoryDtoSchema,
  },
}
