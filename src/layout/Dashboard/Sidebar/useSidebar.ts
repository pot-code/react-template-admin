import { MenuProps } from "antd"
import { clone } from "lodash-es"
import TreeUtil from "@/router/schema/TreeUtil"
import useSchemaStore from "@/router/schema/useSchemaStore"
import usePathSegments from "@/router/usePathSegments"
import { filterByHiddenInMenu, keyPathToRoutePath, routeSchemaToMenuItem, sortByOrder } from "./util"

export default function useSidebar() {
  const navigate = useNavigate()
  const segments = usePathSegments()
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()
  const items = useMemo(
    () =>
      dashboardSchema
        ? new TreeUtil(dashboardSchema).filter(filterByHiddenInMenu)?.sortBy(sortByOrder).map(routeSchemaToMenuItem)
            .root.children
        : undefined,
    [dashboardSchema],
  )
  const onSelect: MenuProps["onSelect"] = ({ keyPath }) => {
    setSelectedKeys(keyPath)
    navigate(keyPathToRoutePath(keyPath))
  }
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys)
  }

  useEffect(() => {
    setSelectedKeys(clone(segments).reverse())
    setOpenKeys(clone(segments).reverse())
  }, [segments])

  return { items, openKeys, selectedKeys, onSelect, onOpenChange }
}
