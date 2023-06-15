import { Menu } from "antd"
import useSidebar from "./use-sidebar"

export default function Sidebar() {
  const { items, openKeys, selectedKeys, onSelect, onOpenChange } = useSidebar()

  return (
    <Menu
      className="h-full"
      mode="inline"
      items={items}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      onOpenChange={onOpenChange}
    />
  )
}
