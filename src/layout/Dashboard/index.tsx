import { css } from "@emotion/react"
import { Breadcrumb, Menu, theme } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import RouteLoading from "./RouteLoading"
import useBreadcrumb from "./useBreadcrumb"
import useMenu from "./useMenu"

const { useToken } = theme

export default function Dashboard() {
  const { items: menuItems, selectedKeys, onSelect } = useMenu()
  const { items: breadcrumbItems } = useBreadcrumb()
  const {
    token: { colorBgContainer, colorBgBase, colorBorderSecondary, padding },
  } = useToken()

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <section
          css={css`
            width: 256px;
          `}
        >
          <Menu
            className="h-full"
            mode="inline"
            items={menuItems}
            defaultOpenKeys={selectedKeys}
            selectedKeys={selectedKeys}
            onSelect={onSelect}
          />
        </section>
        <section
          className="flex flex-col flex-1"
          css={css`
            background-color: ${colorBgBase};
          `}
        >
          <nav
            css={css`
              padding: ${padding}px;
              background-color: ${colorBgContainer};
              border-bottom: 1px solid ${colorBorderSecondary};
            `}
          >
            <Breadcrumb items={breadcrumbItems} />
          </nav>
          <Suspense fallback={<RouteLoading delay={300} />}>
            <main
              className="flex-1"
              css={css`
                padding: ${padding}px;
              `}
            >
              <Outlet />
            </main>
          </Suspense>
        </section>
      </div>
    </div>
  )
}
