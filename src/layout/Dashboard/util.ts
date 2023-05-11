import { RouteSchema } from "@/router/type"
import { createMapper } from "@/router/util"
import { MenuItem } from "./type"

export const routeSchemaToMenuItem = createMapper<MenuItem>((route: RouteSchema) => ({
  key: route.path,
  label: route.label,
}))
