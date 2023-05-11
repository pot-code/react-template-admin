import { css } from "@emotion/react"
import { Breadcrumb, theme } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import useBreadcrumb from "@/router/useBreadcrumb"
import Navbar from "./Navbar"
import RouteLoading from "./RouteLoading"
import Sidebar from "./Sidebar"

const { useToken } = theme

export default function Dashboard() {
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
            background-color: ${colorBgContainer};
          `}
        >
          <Sidebar />
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
