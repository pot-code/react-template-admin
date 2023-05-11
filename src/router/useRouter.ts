import { cloneDeep, concat } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import { routeApi } from "./api"
import { schemas } from "./schemas"
import { RemoteRouteSchema, RouteSchema } from "./type"
import useSchemaStore from "./useSchemaStore"
import { createMapper, routeSchemaToRouteObject } from "./util"
import ViewManager from "./view"

const viewManager = new ViewManager()

const setRemoteRouteElement = createMapper((schema: RouteSchema) => {
  const { viewPath } = schema as RemoteRouteSchema
  if (viewPath) {
    const component = React.lazy(viewManager.getViewComponent(viewPath))
    schema.element = React.createElement(component)
  }
  return schema
})

export default function useRouter() {
  const store = useSchemaStore()
  const [routes, setRoutes] = React.useState<RouteObject[]>([])
  const { isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      const routeSchemas = cloneDeep(schemas)
      const rootRouteSchema = routeSchemas[0]
      const remoteRouteSchemas = data.map(setRemoteRouteElement)

      if (rootRouteSchema.children) rootRouteSchema.children = concat(rootRouteSchema.children, remoteRouteSchemas)
      else rootRouteSchema.children = remoteRouteSchemas

      store.setSchemas(routeSchemas)
      setRoutes(routeSchemas.map(routeSchemaToRouteObject))
    },
  })

  return { isLoading, routes }
}
