import { cloneDeep, concat } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import { routeApi } from "./api"
import { dashboardSchema } from "./schema"
import TreeUtil from "./schema/TreeUtil"
import { RemoteRouteSchema, RouteSchema } from "./schema/type"
import useSchemaStore from "./schema/useSchemaStore"
import { routeSchemaToRouteObject } from "./util"
import ViewManager from "./view"

const viewManager = new ViewManager()

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
      const schemas: RouteSchema[] = []
      const copyOfDashboardSchema = cloneDeep(dashboardSchema)

      if (copyOfDashboardSchema.children) {
        copyOfDashboardSchema.children = concat(copyOfDashboardSchema.children, data)
      } else copyOfDashboardSchema.children = data

      schemas.push(copyOfDashboardSchema)
      store.setDashboardSchema(copyOfDashboardSchema)
      setRoutes(schemas.map((v) => new TreeUtil(v).map(setRemoteRouteElement).map(routeSchemaToRouteObject).root))
    },
  })

  return { isLoading, routes }
}
