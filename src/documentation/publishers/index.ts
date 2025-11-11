import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { mergePaths } from "../../utilities/merge-path.utility";
import { CreatePublisherInDtoSchema } from "./schemas/create-publisher-in-dto.publishers.schema";
import { PublisherOutDtoSchema } from "./schemas/publisher-out-dto.publishers.schema";
import { UpdatePublisherInDtoSchema } from "./schemas/update-publisher-in-dto.publishers.schema";
import { CreatePublisherPath } from "./paths/create.publishers.path";
import { UpdatePublisherPath } from "./paths/update.publishers.path";
import { DeletePublisherPath } from "./paths/delete.publishers.path";
import { GetAllPublishersPath } from "./paths/get-all.publishers.path";
import { GetPublisherByIdPath } from "./paths/get-by-id.publishers.path";
import { GetPublisherByNamePath } from "./paths/get-by-name.publishers.path";

export const PublishersDocumentation: ModuleDocumentation = {
  paths: mergePaths(CreatePublisherPath, UpdatePublisherPath, DeletePublisherPath, GetAllPublishersPath, GetPublisherByIdPath, GetPublisherByNamePath),
  schemas: {
    CreatePublisherInDtoSchema,
    PublisherOutDtoSchema,
    UpdatePublisherInDtoSchema
  }
};