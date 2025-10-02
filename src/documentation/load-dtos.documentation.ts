import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import "../dtos/out/author.dto";
import "../dtos/out/publisher.dto";

export async function loadDTOs(documentation: Record<string, any>) {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: undefined,
  });

  if (!documentation.components) documentation.components = {};

  documentation.components.schemas = {
    ...documentation.components.schemas,
    ...schemas,
  };

  return documentation;
}
