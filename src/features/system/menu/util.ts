import * as d3 from "d3"
import { RouteSchema } from "./types"

export function buildSchemaTree(routeSchemas: RouteSchema[]) {
  return d3
    .stratify<RouteSchema>()
    .id((v) => v.id)
    .parentId((v) => v.parentId)(routeSchemas)
}
