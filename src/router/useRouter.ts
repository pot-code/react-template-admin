import { cloneDeep, concat, isEmpty } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import { routeApi } from "./api"
import { dashboardSchema } from "./schema"
import TreeUtil from "./schema/tree-util"
import { RemoteRouteSchema, RouteSchema } from "./schema/type"
import useSchemaStore from "./schema/useSchemaStore"
import ViewManager from "./view-manager"
import { setLocalRouteSchemaId } from "./util"

const viewManager = new ViewManager()

function routeSchemaToRouteObject(schema: RouteSchema) {
  const { path, element, id } = schema
  return { id, path, element } as RouteObject
}

function setRemoteRouteElement(schema: RouteSchema) {
  const { viewPath } = schema as RemoteRouteSchema
  if (viewPath) {
    const component = React.lazy(viewManager.getViewComponent(viewPath))
    schema.element = React.createElement(component)
  }
  return schema
}

export default function useRouter() {
  const store = useSchemaStore()
  const [routes, setRoutes] = React.useState<RouteObject[]>([])
  const { isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      const virtualRoot: RouteSchema = { path: "", order: -1, children: [] }
      const copyOfDashboardSchema = cloneDeep(dashboardSchema)

      if (copyOfDashboardSchema.children) {
        copyOfDashboardSchema.children = concat(copyOfDashboardSchema.children, data)
      } else copyOfDashboardSchema.children = data

      virtualRoot.children?.push(copyOfDashboardSchema)
      virtualRoot.children?.forEach((schema, index) => {
        setLocalRouteSchemaId(schema, "", index)
      })
      store.setDashboardSchema(copyOfDashboardSchema)
      setRoutes(new TreeUtil(virtualRoot).map(setRemoteRouteElement).map(routeSchemaToRouteObject).root.children || [])
    },
  })

  return { isLoading, routes }
}
