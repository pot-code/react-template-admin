import { isNil } from "lodash-es"
import { RouteSchema } from "@/router/type"

export function routeSchemaToMenuItem(route: RouteSchema) {
  const { label, path, children, hiddenInMenu } = route
  if (hiddenInMenu) return null

  const item: any = {
    label,
    key: path,
  }
  if (children) item.children = children.map(routeSchemaToMenuItem).filter((v) => !isNil(v))
  return item
}
