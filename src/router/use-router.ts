import * as d3 from "d3"
import { produce } from "immer"
import React from "react"
import { RouteObject } from "react-router-dom"
import TreeUtil from "@/utils/tree-util"
import useFetchMenu from "@/features/system/menu/use-fetch-menu"
import useSchemaStore from "../store/use-schema-store"
import { buildSchemaTree, isRootMenu } from "../features/system/menu/util"
import ViewManager from "../core/route/view-manager"
import { RouteSchema, RemoteRouteSchema, DASHBOARD_ID, dashboard } from "@/core/route"

const viewManager = new ViewManager()

function routeSchemaToRouteObject(schema: RouteSchema) {
  const { path, element, id } = schema
  return { id, path, element } as RouteObject
}

function routeNodeToRouteObject(node: d3.HierarchyNode<RouteSchema>) {
  return routeSchemaToRouteObject(node.data)
}

function setRemoteRouteElement(node: d3.HierarchyNode<RouteSchema>) {
  const schema = node.data as RemoteRouteSchema
  if (schema.viewPath) {
    const componentFactory = viewManager.getViewComponent(schema.viewPath)
    const component = React.lazy(componentFactory)

    schema.element = React.createElement(component)
  }
  return node
}

export default function useRouter() {
  const { setSchemas } = useSchemaStore()
  const [routes, setRoutes] = React.useState<RouteObject[]>([])
  const { isLoading, isSuccess, data } = useFetchMenu()

  useEffect(() => {
    if (isSuccess && data) {
      const remote = produce(data, (draft) => {
        draft.filter(isRootMenu).forEach((v) => {
          v.parentId = DASHBOARD_ID
        })
      })

      const schemas = [...remote, ...dashboard]
      setSchemas(schemas)

      const dashboardRoutes = new TreeUtil(buildSchemaTree(schemas))
        .map(setRemoteRouteElement)
        .map(routeNodeToRouteObject).result
      setRoutes([dashboardRoutes] || [])
    }
  }, [data, isSuccess, setSchemas])

  return { isLoading, routes }
}
