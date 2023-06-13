import * as d3 from "d3"
import { cloneDeep } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import TreeUtil from "@/utils/tree-util"
import { RemoteRouteSchema, RouteSchema } from "@/features/system/menu/types"
import { menuApi } from "../features/system/menu/api"
import useSchemaStore from "../features/system/menu/use-schema-store"
import { buildSchemaTree, isDashboardSchema } from "../features/system/menu/util"
import { settings, SETTINGS_ID } from "./builtin-routes"
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
      setSchemas(cloneDeep(data))

      let schemas: RouteSchema[] = [...data]
      const dashboardSchema = schemas.find(isDashboardSchema)
      if (dashboardSchema) {
        const settingsSchema = cloneDeep(settings)
        const settingsRoot = settingsSchema.find((v) => v.id === SETTINGS_ID)

        if (settingsRoot) settingsRoot.parentId = dashboardSchema.id
        schemas = schemas.concat(settingsSchema)
      }

      const dashboardRoutes = new TreeUtil(buildSchemaTree(schemas))
        .map(setRemoteRouteElement)
        .map(routeNodeToRouteObject).result
      setRoutes([dashboardRoutes] || [])
    },
  })

  return { isLoading, routes }
}
