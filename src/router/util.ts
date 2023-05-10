import { RouteObject } from "react-router-dom"
import { RouteSchema } from "./type"

export function routeSchemaToRouteObject<T extends RouteSchema>(item: T): RouteObject {
  const { path, index, element, children } = item

  const route: RouteObject = {
    path,
    index,
    element,
  }
  if (children) {
    route.children = children.map(routeSchemaToRouteObject)
  }
  return route
}
