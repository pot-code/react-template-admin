import * as d3 from "d3"
import { clone } from "lodash-es"
import React from "react"
import { useQuery } from "react-query"
import { RouteObject } from "react-router-dom"
import { routeApi } from "./api"
import schemas, { DASHBOARD_ID } from "./schema"
import { RemoteRouteSchema, RouteSchema } from "./schema/type"
import useSchemaStore from "./schema/useSchemaStore"
import ViewManager from "./view-manager"
import TreeUtil from "@/utils/tree-util"

const viewManager = new ViewManager()

function routeSchemasToTree(routeSchemas: RouteSchema[]) {
  return d3
    .stratify<RouteSchema>()
    .id((v) => v.id)
    .parentId((v) => v.parentId)(routeSchemas)
}

function nodeSchemaToRouteObject(node: d3.HierarchyNode<RouteSchema>) {
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
      let copyOfSchemas = clone(schemas)

      data.forEach((schema) => {
        if (!schema.parentId) schema.parentId = DASHBOARD_ID
      })
      copyOfSchemas = copyOfSchemas.concat(data)

      const schemaTree = routeSchemasToTree(copyOfSchemas)
      setSchemas(clone(copyOfSchemas))
      setRoutes(new TreeUtil(schemaTree).map(setRemoteRouteElement).map(nodeSchemaToRouteObject).result.children || [])
    },
  })

  return { isLoading, routes }
}
