import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { GetAllHistoriesPath } from './paths/get-all-histories.path'
import { HistoryDtoSchema } from './schemas/history-dto.schema'

export const HistoriesDocumentation: ModuleDocumentation = {
  paths: mergePaths(GetAllHistoriesPath),
  schemas: {
    HistoryDtoSchema,
  },
}
