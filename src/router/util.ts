import { RouteObject } from "react-router-dom"
import { RouteSchema } from "./schema/type"

export function routeSchemaToRouteObject(schema: RouteSchema) {
  const { path, element } = schema
  return {
    path,
    element,
  } as RouteObject
}
