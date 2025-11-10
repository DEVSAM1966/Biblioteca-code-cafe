import { AuthDocumentation } from "./auth";
import { UsersDocumentation } from "./users";

export const documentation = {
  paths: {
    ...AuthDocumentation.paths,
    ...UsersDocumentation.paths
  },
  schemas: {
    ...AuthDocumentation.schemas,
    ...UsersDocumentation.schemas,
  }
}
