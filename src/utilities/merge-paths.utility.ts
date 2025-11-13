import type { OpenAPIV3 } from 'openapi-types'

export function mergePaths(...paths: OpenAPIV3.PathsObject[]): OpenAPIV3.PathsObject {
  return paths.reduce((acc, pathObj) => {
    Object.entries(pathObj).forEach(([path, methods]) => {
      if (!acc[path]) {
        acc[path] = {}
      }
      Object.assign(acc[path], methods)
    })
    return acc
  }, {} as OpenAPIV3.PathsObject)
}
