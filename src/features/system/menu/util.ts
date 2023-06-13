import * as d3 from "d3"
import { isNil } from "lodash-es"
import { RouteSchema } from "./types"

export function buildSchemaTree(schemas: RouteSchema[]) {
  return d3
    .stratify<RouteSchema>()
    .id((v) => v.id)
    .parentId((v) => v.parentId)(schemas)
}

export function isRootMenu(schema: RouteSchema) {
  return isNil(schema.parentId)
}
