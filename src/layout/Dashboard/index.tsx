import { Layout, Menu } from "antd"
import { Outlet } from "react-router-dom"

const { Content, Sider, Header } = Layout

export default function Dashboard() {
  return (
    <Layout className="h-screen">
      <Header className="bg-white h-[56px]">
        <span>Logo</span>
      </Header>
      <Layout>
        <Sider width={240} theme="light">
          <Menu mode="inline" />
        </Sider>
        <Content className="p-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
