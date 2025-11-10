import type { ModuleDocumentation } from "../../models/module-documentation.model";
import { CreatePublisherInDtoSchema } from "./schemas/create-publisher-in-dto.publishers.schema";
import { PublisherOutDtoSchema } from "./schemas/publisher-out-dto.publishers.schema";

export const PublishersDocumentation: ModuleDocumentation = {
  paths: {

  },
  schemas: {
    CreatePublisherInDtoSchema,
    PublisherOutDtoSchema
  }
};