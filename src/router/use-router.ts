import * as d3 from "d3"
import { cloneDeep } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import TreeUtil from "@/utils/tree-util"
import { RemoteRouteSchema, RouteSchema } from "@/features/system/menu/types"
import { menuApi } from "../features/system/menu/api"
import { DASHBOARD_ID, dashboard } from "../features/system/menu/builtins"
import useSchemaStore from "../features/system/menu/use-schema-store"
import { buildSchemaTree, isRootMenu } from "../features/system/menu/util"
import ViewManager from "./view-manager"

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
  const { isLoading } = useQuery(["routes"], () => menuApi.list(), {
    onSuccess({ data }) {
      data.filter(isRootMenu).forEach((v) => {
        v.parentId = DASHBOARD_ID
      })

      const schemas = [...data, ...dashboard]
      setSchemas(cloneDeep(schemas))

      const dashboardRoutes = new TreeUtil(buildSchemaTree(schemas))
        .map(setRemoteRouteElement)
        .map(routeNodeToRouteObject).result
      setRoutes([dashboardRoutes] || [])
    },
  })

  return { isLoading, routes }
}
