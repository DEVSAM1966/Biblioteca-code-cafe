import type { ModuleDocumentation } from '../../models/module-documentation.model'
import { mergePaths } from '../../utilities/merge-paths.utility'
import { CreatePublisherDtoSchema } from './schemas/create-publisher-dto.schema'
import { PublisherDtoSchema } from './schemas/publisher-dto.schema'
import { UpdatePublisherDtoSchema } from './schemas/update-publisher-dto.schema'
import { CreatePublisherPath } from './paths/create-publisher.path'
import { UpdatePublisherPath } from './paths/update-publisher.path'
import { DeletePublisherPath } from './paths/delete-publisher.path'
import { GetAllPublishersPath } from './paths/get-all-publishers.path'
import { GetPublisherByIdPath } from './paths/get-publisher-by-id.path'
import { GetPublisherByNamePath } from './paths/get-publisher-by-name.path'

export const PublishersDocumentation: ModuleDocumentation = {
  paths: mergePaths(
    CreatePublisherPath,
    UpdatePublisherPath,
    DeletePublisherPath,
    GetAllPublishersPath,
    GetPublisherByIdPath,
    GetPublisherByNamePath,
  ),
  schemas: {
    CreatePublisherDtoSchema,
    PublisherDtoSchema,
    UpdatePublisherDtoSchema,
  },
}
