import { css } from "@emotion/react"
import { Breadcrumb, theme } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { BsLayoutSidebarInset } from "react-icons/bs"
import { motion } from "framer-motion"
import useBreadcrumb from "@/router/useBreadcrumb"
import Navbar from "./Navbar"
import RouteLoading from "./RouteLoading"
import Sidebar from "./Sidebar"
import useSidebarStore from "./userSidebarStore"
import { sidebarVariants } from "./variants"

const { useToken } = theme

export default function Dashboard() {
  const { items: breadcrumbItems } = useBreadcrumb()
  const { open, toggleOpen } = useSidebarStore()
  const {
    token: { colorText, colorBgContainer, colorBgBase, colorBorderSecondary, padding },
  } = useToken()

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <motion.section
          css={css`
            background-color: ${colorBgContainer};
          `}
          className="overflow-hidden"
          variants={sidebarVariants}
          initial="visible"
          animate={open ? "visible" : "hidden"}
        >
          <Sidebar />
        </motion.section>
        <section
          className="flex flex-col flex-1"
          css={css`
            background-color: ${colorBgBase};
          `}
        >
          <nav
            className="flex items-center gap-2"
            css={css`
              padding: ${padding}px;
              background-color: ${colorBgContainer};
              border-bottom: 1px solid ${colorBorderSecondary};
            `}
          >
            <BsLayoutSidebarInset className="cursor-pointer" color={colorText} onClick={() => toggleOpen()} />
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
