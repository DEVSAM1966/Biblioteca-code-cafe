import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import "../dtos/out/author.dto";
import "../dtos/out/publisher.dto";

export async function ensureComponents(doc: any) {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: undefined,
  });

  if (!doc.components) doc.components = {};
  doc.components.schemas = { ...doc.components.schemas, ...schemas };

  return doc;
}
