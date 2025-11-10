import type { OpenAPIV3 } from "openapi-types";

export type ModuleDocumentation = {
  paths: OpenAPIV3.PathsObject;
  schemas: Record<string, OpenAPIV3.SchemaObject>;
}