import { RouteObject } from "react-router-dom"
import { RouteSchema } from "./type"

interface TreeLikeObject {
  children?: TreeLikeObject[]
}

export function createMapper<T extends TreeLikeObject>(fn: (schema: RouteSchema) => T) {
  return function mapper(schema: RouteSchema) {
    const t = fn(schema)
    if (schema.children) t.children = schema.children?.map(mapper)
    return t
  }
}

export function createFilter(predict: (route: RouteSchema) => Boolean) {
  return function filter(schema: RouteSchema) {
    if (!predict(schema)) return false // 先行判断可以减少对子树的访问
    if (schema.children) schema.children = schema.children.filter(filter)
    return true
  }
}

export const routeSchemaToRouteObject = createMapper((schema) => {
  const { path, element } = schema
  return {
    path,
    element,
  } as RouteObject
})

export const filterByHiddenInMenu = createFilter((route: RouteSchema) => !route.hiddenInMenu)
