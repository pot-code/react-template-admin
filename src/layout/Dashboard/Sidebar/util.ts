import { clone } from "lodash-es"
import { RouteSchema } from "@/router/schema/type"
import { MenuItem } from "../type"

export function routeSchemaToMenuItem(route: RouteSchema) {
  return {
    key: route.path,
    label: route.label,
  } as MenuItem
}

export function filterByHiddenInMenu(route: RouteSchema) {
  return !route.hiddenInMenu
}

export function keyPathToRoutePath(keyPath: string[]) {
  return clone(keyPath).reverse().join("/")
}

export function sortByOrder(a: RouteSchema, b: RouteSchema) {
  return a.order - b.order
}
