import { css } from "@emotion/react"
import { Breadcrumb, Layout, Menu, Switch, theme } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import useTheme from "@/theme/useTheme"
import { ThemeMode } from "@/theme/type"
import RouteLoading from "./RouteLoading"
import useBreadcrumb from "./useBreadcrumb"
import useMenu from "./useMenu"

const { Header } = Layout

const { useToken } = theme

export default function Dashboard() {
  const { items: menuItems, selectedKeys, onSelect } = useMenu()
  const { mode, toggleThemeMode } = useTheme()
  const { items: breadcrumbItems } = useBreadcrumb()
  const {
    token: { colorBgContainer, colorBgBase, colorBorderSecondary, padding },
  } = useToken()

  return (
    <div className="flex flex-col h-screen">
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
          unCheckedChildren="纯白"
          checked={mode === ThemeMode.Dark}
          onChange={() => toggleThemeMode()}
        />
      </Header>
      <div className="flex flex-1">
        <div
          css={css`
            width: 256px;
          `}
        >
          <Menu className="h-full" mode="inline" items={menuItems} selectedKeys={selectedKeys} onSelect={onSelect} />
        </div>
        <div
          className="flex flex-col flex-1"
          css={css`
            background-color: ${colorBgBase};
          `}
        >
          <div
            css={css`
              padding: ${padding}px;
              background-color: ${colorBgContainer};
              border-bottom: 1px solid ${colorBorderSecondary};
            `}
          >
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <Suspense fallback={<RouteLoading delay={300} />}>
            <div
              className="flex-1"
              css={css`
                padding: ${padding}px;
              `}
            >
              <Outlet />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
