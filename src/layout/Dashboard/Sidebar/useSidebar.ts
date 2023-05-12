import { MenuProps } from "antd"
import { clone } from "lodash-es"
import { filterByHiddenInMenu, keyPathToRoutePath, routeSchemaToMenuItem } from "./util"
import useSchemaStore from "@/router/schema/useSchemaStore"
import TreeUtil from "@/router/schema/TreeUtil"
import usePathSegments from "@/router/usePathSegments"

export default function useSidebar() {
  const navigate = useNavigate()
  const segments = usePathSegments()
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const items = useMemo(
    () =>
      dashboardSchema
        ? new TreeUtil(dashboardSchema).filter(filterByHiddenInMenu)?.map(routeSchemaToMenuItem).root.children
        : undefined,
    [dashboardSchema],
  )
  const onSelect: MenuProps["onSelect"] = ({ keyPath }) => {
    setSelectedKeys(keyPath)
    navigate(keyPathToRoutePath(keyPath))
  }

  useEffect(() => {
    setSelectedKeys(clone(segments).reverse())
  }, [segments])

  return { items, selectedKeys, onSelect }
}
