import { Menu } from "antd"
import useSidebar from "./use-sidebar"

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
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
