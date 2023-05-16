import * as d3 from "d3"
import { useQuery } from "react-query"
import { TreeProps } from "antd"
import { curry } from "lodash-es"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/utils/tree-util"
import { buildSchemaTree, setRemoteSchemaParentId } from "@/router/schema/util"

const virtualRootId = "virtual"

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

export default function useMenu() {
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()
  const schemaMap = useMemo(() => {
    const map: SchemaMap = new Map()
    schemas.forEach((schema) => setSchemaMapValue(map, schema))
    return map
  }, [schemas])

  const { data: res, isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      setSchemas(data)
    },
  })
  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { id: virtualRootId, path: "", order: -1 }
    const remoteSchemas: RouteSchema[] | undefined = res?.data.map(curry(setRemoteSchemaParentId)(virtualRootId))
    if (remoteSchemas) {
      remoteSchemas.push(virtualRoot)
      const tree = buildSchemaTree(remoteSchemas)
      return new TreeUtil(tree).map(routeSchemaToTreeNode).result.children
    }
    return []
  }, [res])

  const onSelect: TreeProps["onSelect"] = (keys) => {
    const firstKey = keys[0]
    if (firstKey) setSelectedRoute(schemaMap.get(firstKey.toString()))
  }

  return { isLoading, selectedRoute, treeNodes, onSelect }
}
