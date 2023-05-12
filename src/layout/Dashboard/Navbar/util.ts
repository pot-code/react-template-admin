import { RouteSchema } from "@/router/schema/type"
import { MenuItem } from "../type"

export function settingSchemaToMenuItem(prefix: string, route: RouteSchema) {
  return {
    key: `${prefix}/${route.path}`,
    label: route.label,
  } as MenuItem
}
