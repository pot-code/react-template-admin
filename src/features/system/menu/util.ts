import * as d3 from "d3"
import { cloneDeep, isNil } from "lodash-es"
import { RouteSchema } from "@/router"

export function buildSchemaTree(schemas: RouteSchema[]) {
  return d3
    .stratify<RouteSchema>()
    .id((v) => v.id)
    .parentId((v) => v.parentId)(cloneDeep(schemas))
}

export function isRootMenu(schema: RouteSchema) {
  return isNil(schema.parentId)
}
