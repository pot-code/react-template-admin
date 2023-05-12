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
