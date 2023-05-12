import { Menu } from "antd"
import useSidebar from "./useSidebar"

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const { items: menuItems, selectedKeys, onSelect } = useSidebar()

  return (
    <Menu
      className="h-full"
      mode="inline"
      items={menuItems}
      defaultOpenKeys={selectedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
    />
  )
}
