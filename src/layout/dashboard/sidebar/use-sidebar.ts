import { MenuProps } from "antd"
import * as d3 from "d3"
import { useMatches } from "react-router-dom"
import { RouteSchema } from "@/features/system/menu/schema"
import useSchemaStore from "@/features/system/menu/use-schema-store"
import { buildSchemaTree } from "@/features/system/menu/util"
import TreeUtil from "@/utils/tree-util"
import { MenuItem } from "../type"

function routeSchemaToMenuItem(node: d3.HierarchyNode<RouteSchema>) {
  return {
    key: node.data.id,
    label: node.data.label,
  } as MenuItem
}

function filterRouteByHiddenInMenu(node: d3.HierarchyNode<RouteSchema>) {
  return !node.data.hiddenInMenu
}

function sortRouteByOrder(a: d3.HierarchyNode<RouteSchema>, b: d3.HierarchyNode<RouteSchema>) {
  return a.data.order - b.data.order
}

export default function useSidebar() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()

  const navigate = useNavigate()
  const matches = useMatches()
  const schemas = useSchemaStore((state) => state.schemas)

  const schemaTree = useMemo(() => buildSchemaTree(schemas), [schemas])
  const items = useMemo(
    () =>
      new TreeUtil(schemaTree.copy())
        .filter(filterRouteByHiddenInMenu)
        ?.sortBy(sortRouteByOrder)
        .map(routeSchemaToMenuItem).result.children,
    [schemaTree],
  )

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    const foundSchema = schemaTree.find((v) => v.data.id === key)
    if (foundSchema) {
      const url = foundSchema
        .ancestors()
        .map((v) => v.data.path)
        .reverse()
        .join("/")
        .replace("//", "/")
      navigate(url)
    }
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
