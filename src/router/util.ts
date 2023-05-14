import { RouteObject } from "react-router-dom"
import { RouteSchema } from "./schema/type"

export function routeSchemaToRouteObject(schema: RouteSchema) {
  const { path, element, id } = schema
  return { id, path, element } as RouteObject
}
