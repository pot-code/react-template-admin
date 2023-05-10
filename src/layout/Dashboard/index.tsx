import { css } from "@emotion/react"
import { Breadcrumb, Layout, Menu, Switch, theme } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import useTheme from "@/theme/useTheme"
import { ThemeMode } from "@/theme/type"
import RouteLoading from "./RouteLoading"
import useBreadcrumb from "./useBreadcrumb"
import useMenu from "./useMenu"

const { Content, Sider, Header } = Layout
const { useToken } = theme

export default function Dashboard() {
  const { items: menuItems, selectedKeys, onSelect } = useMenu()
  const { mode, toggleThemeMode } = useTheme()
  const { items: breadcrumbItems } = useBreadcrumb()
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = useToken()

  return (
    <Layout className="h-screen">
      <Header
        className="flex justify-between items-center"
        css={css`
          background-color: ${colorBgContainer};
          border-bottom: 1px solid ${colorBorderSecondary};
        `}
      >
        <span>Logo</span>
        <Switch
          checkedChildren="暗黑"
          unCheckedChildren="玉白"
          checked={mode === ThemeMode.Dark}
          onChange={() => toggleThemeMode()}
        />
      </Header>
      <Layout>
        <Sider width={240}>
          <Menu className="h-full" mode="inline" items={menuItems} selectedKeys={selectedKeys} onSelect={onSelect} />
        </Sider>
        <Content className="p-4">
          <Breadcrumb items={breadcrumbItems} />
          <Suspense fallback={<RouteLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}
