import { TreeProps } from "antd"
import { RouteSchema } from "@/core/route"
import useMenuTree from "../menu/use-menu-tree"

export default function usePrivilege() {
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()

  const { menus, treeNodes, isVirtualRoot } = useMenuTree()

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const menu = menus.find((v) => v.id === keys[0])
    if (menu && !isVirtualRoot(menu)) {
      setSelectedMenu(menu)
    }
  }

  return {
    treeNodes,
    selectedMenu,
    onTreeNodeSelect,
  }
}
