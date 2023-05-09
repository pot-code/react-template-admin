import { RouteObject } from "react-router-dom"
import { RouteItem } from "./type"

export function toReactRouterRoute(item: RouteItem): RouteObject {
  const { path, index, element, children } = item
  const route: RouteObject = {
    path,
    index,
    element,
  }
  if (children) {
    route.children = children.map(toReactRouterRoute)
  }
  return route
}
