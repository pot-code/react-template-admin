import * as d3 from "d3"
import { useQuery } from "react-query"
import { TreeProps } from "antd"
import { curry } from "lodash-es"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/utils/tree-util"
import { buildSchemaTree } from "@/router/schema/util"
import { DASHBOARD_ID } from "@/router/schema"

type SchemaMap = Map<string, RouteSchema>

interface TreeNode {
  title: string
  key: string
  children: TreeNode[]
}

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
  } as TreeNode
}

function setSchemaMapValue(map: SchemaMap, schema: RouteSchema) {
  map.set(schema.id!, schema)
}

function setSchemaParentId(parentId: string, schema: RouteSchema) {
  return {
    ...schema,
    parentId: schema.parentId || parentId,
  }
}

export default function useMenu() {
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()
  const schemaMap = useMemo(() => {
    const map: SchemaMap = new Map()
    schemas.forEach((schema) => setSchemaMapValue(map, schema))
    return map
  }, [schemas])
  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { id: DASHBOARD_ID, path: "", order: -1 }
    const mappedSchema: RouteSchema[] = schemas.map(curry(setSchemaParentId)(DASHBOARD_ID))
    mappedSchema.push(virtualRoot)
    const tree = buildSchemaTree(mappedSchema)
    return new TreeUtil(tree).map(routeSchemaToTreeNode).result.children
  }, [schemas])

  const { isLoading } = useQuery(["menus"], () => routeApi.list(), {
    onSuccess({ data }) {
      setSchemas(data)
    },
  })

  const onSelect: TreeProps["onSelect"] = (keys) => {
    const firstKey = keys[0]
    if (firstKey) setSelectedRoute(schemaMap.get(firstKey.toString()))
  }

  return { isLoading, selectedRoute, treeNodes, onSelect }
}
