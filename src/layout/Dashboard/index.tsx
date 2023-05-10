import { Breadcrumb, Layout, Menu } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import RouteLoading from "./RouteLoading"
import useBreadcrumb from "./useBreadcrumb"
import useMenu from "./useMenu"

const { Content, Sider, Header } = Layout

export default function Dashboard() {
  const { items: menuItems, selectedKeys, onSelect } = useMenu()
  const { items: breadcrumbItems } = useBreadcrumb()

  return (
    <Layout className="h-screen">
      <Header className="bg-white h-[56px]">
        <span>Logo</span>
      </Header>
      <Layout>
        <Sider width={240} theme="light">
          <Menu mode="inline" items={menuItems} selectedKeys={selectedKeys} onSelect={onSelect} />
        </Sider>
        <Content className="p-4">
          <Breadcrumb items={breadcrumbItems} />
          <div className="p-4">
            <Suspense fallback={<RouteLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
