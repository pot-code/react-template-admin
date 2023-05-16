import * as d3 from "d3"
import { MenuProps } from "antd"
import { isEmpty } from "lodash-es"
import { useMatches } from "react-router-dom"
import TreeUtil from "@/utils/tree-util"
import { RouteSchema } from "@/router/schema/type"
import useSchemaStore from "@/router/schema/useSchemaStore"
import { MenuItem } from "../type"
import { routeSchemasToTree } from "@/router/schema/util"
import { DASHBOARD_ID } from "@/router/schema"

function routeSchemaToMenuItem(node: d3.HierarchyNode<RouteSchema>) {
  return {
    key: node.data.id,
    label: node.data.label,
  } as MenuItem
}

function filterByHiddenInMenu(node: d3.HierarchyNode<RouteSchema>) {
  return !node.data.hiddenInMenu
}

function sortByOrder(a: d3.HierarchyNode<RouteSchema>, b: d3.HierarchyNode<RouteSchema>) {
  return a.data.order - b.data.order
}

function setRouteMapValue(map: Map<string, string>, node: d3.HierarchyNode<RouteSchema>, parentPath: string) {
  const schema = node.data
  const routePath = isEmpty(parentPath) ? schema.path : `${parentPath}/${schema.path}`.replace("//", "/")
  if (schema.id) map.set(schema.id, routePath)
  if (node.children) node.children.forEach((child) => setRouteMapValue(map, child, routePath))
}

export default function useSidebar() {
  const navigate = useNavigate()
  const matches = useMatches()
  const schemas = useSchemaStore((state) => state.schemas)
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()
  const routeMap = useMemo(() => {
    const map = new Map<string, string>()
    const tree = routeSchemasToTree(schemas)
    if (tree) setRouteMapValue(map, tree, "")
    return map
  }, [schemas])
  const items = useMemo(() => {
    const tree = routeSchemasToTree(schemas)
    const dashboard = tree.find((v) => v.data.id === DASHBOARD_ID)
    if (dashboard) {
      return new TreeUtil(dashboard).filter(filterByHiddenInMenu)?.sortBy(sortByOrder).map(routeSchemaToMenuItem).result
        .children
    }
    return []
  }, [schemas])

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    const routePath = routeMap.get(key)
    if (routePath) navigate(routePath)
  }
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys)
  }

  useEffect(() => {
    const keys = matches.map((match) => match.id).reverse()
    setSelectedKeys(keys)
    setOpenKeys(keys)
  }, [matches])

  return { items, openKeys, selectedKeys, onSelect, onOpenChange }
}
