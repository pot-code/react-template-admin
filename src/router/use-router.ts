import * as d3 from "d3"
import { produce } from "immer"
import React from "react"
import { RouteObject } from "react-router-dom"
import { omit } from "lodash-es"
import TreeUtil from "@/utils/tree-util"
import useFetchMenu from "@/features/system/menu/use-fetch-menu"
import useSchemaStore from "../store/use-schema-store"
import { buildSchemaTree, isRootMenu } from "../features/system/menu/util"
import { DASHBOARD_ID, dashboard } from "./builtins"
import { RouteSchema } from "./types"
import ViewManager from "./view-manager"

const viewManager = new ViewManager()

function routeSchemaToRouteObject(schema: RouteSchema) {
  const { path, element, id } = schema
  return { id, path, element } as RouteObject
}

function schemaToRouteObject(node: d3.HierarchyNode<RouteSchema>) {
  return routeSchemaToRouteObject(node.data)
}

function setRemoteRouteElement(schema: RouteSchema) {
  const { viewPath } = schema
  if (viewPath) {
    const componentFactory = viewManager.getViewComponent(viewPath)
    const component = React.lazy(componentFactory)

    schema.element = React.createElement(component)
  }
}

function setRemoteRouteParent(schema: RouteSchema) {
  if (isRootMenu(schema)) {
    schema.parentId = DASHBOARD_ID
  }
}

function omitSchemaElement(schema: RouteSchema) {
  return omit(schema, "element")
}

function schemaIdToString(schema: RouteSchema) {
  return { ...schema, id: schema.id.toString() }
}

export default function useRouter() {
  const { setSchemas } = useSchemaStore()
  const [routes, setRoutes] = React.useState<RouteObject[]>([])
  const { isLoading, isSuccess, data } = useFetchMenu()

  useEffect(() => {
    if (isSuccess && data) {
      const remote = produce(data, (draft) => {
        draft.forEach(setRemoteRouteParent)
        draft.forEach(setRemoteRouteElement)
      })

      const schemas = [...remote, ...dashboard()].map(schemaIdToString)
      setSchemas(schemas.map(omitSchemaElement))

      const dashboardRoutes = new TreeUtil(buildSchemaTree(schemas)).map(schemaToRouteObject).result
      setRoutes([dashboardRoutes] || [])
    }
  }, [data, isSuccess, setSchemas])

  return { isLoading, routes }
}
