import { TreeProps } from "antd"
import { toAntdPaginationParams } from "@/core/http/pagination"
import { RouteSchema } from "@/core/route"
import useMenuTree from "../menu/use-menu-tree"
import useFetchPrivilege from "./use-fetch-privilege"

export default function usePrivilege() {
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()

  const { menus, treeNodes, isVirtualRoot } = useMenuTree()
  const { data, pagination: paginationParams, isLoading } = useFetchPrivilege(selectedMenu?.id)

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const menu = menus.find((v) => v.id === keys[0])
    if (menu && !isVirtualRoot(menu)) {
      setSelectedMenu(menu)
    }
  }

  const pagination = paginationParams ? toAntdPaginationParams(paginationParams) : undefined

  return {
    data,
    pagination,
    treeNodes,
    selectedMenu,
    isLoading,
    onTreeNodeSelect,
  }
}
