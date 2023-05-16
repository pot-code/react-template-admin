import * as d3 from "d3"
import { clone, cloneDeep, curry } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import { routeApi } from "./api"
import schemas, { settingSchemas } from "./schema"
import { RemoteRouteSchema, RouteSchema } from "./schema/type"
import useSchemaStore from "./schema/useSchemaStore"
import ViewManager from "./view-manager"
import TreeUtil from "@/utils/tree-util"
import { buildSchemaTree, setRemoteSchemaParentId } from "./schema/util"
import { DASHBOARD_ID } from "./schema/config"

const viewManager = new ViewManager()

function routeSchemaToRouteObject(node: d3.HierarchyNode<RouteSchema>) {
  const { path, element, id } = node.data
  return { id, path, element } as RouteObject
}

function setRemoteRouteElement(node: d3.HierarchyNode<RouteSchema>) {
  const schema = node.data as RemoteRouteSchema
  if (schema.viewPath) {
    const component = React.lazy(viewManager.getViewComponent(schema.viewPath))
    schema.element = React.createElement(component)
  }
  return node
}

export default function useRouter() {
  const { setSchemas } = useSchemaStore()
  const [routes, setRoutes] = React.useState<RouteObject[]>([])
  const { isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      const setDashboardAsParent = curry(setRemoteSchemaParentId)(DASHBOARD_ID)

      let copyOfSchemas = cloneDeep(schemas)
      const copyOfSettingsSchemas = cloneDeep(settingSchemas).map(setDashboardAsParent)
      const remoteSchemas = data.map(setDashboardAsParent)
      copyOfSchemas = copyOfSchemas.concat(remoteSchemas, copyOfSettingsSchemas)

      const schemaTree = buildSchemaTree(copyOfSchemas)
      const routeTree = new TreeUtil(schemaTree).map(setRemoteRouteElement).map(routeSchemaToRouteObject).result
      setSchemas(clone(copyOfSchemas))
      setRoutes([routeTree] || [])
    },
  })

  return { isLoading, routes }
}
