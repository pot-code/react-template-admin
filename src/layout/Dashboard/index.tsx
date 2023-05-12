import { css } from "@emotion/react"
import { Breadcrumb, theme } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { BsLayoutSidebarInset } from "react-icons/bs"
import { motion } from "framer-motion"
import useBreadcrumb from "@/router/useBreadcrumb"
import Navbar from "./Navbar"
import ContentLoading from "./ContentLoading"
import Sidebar from "./Sidebar"
import { sidebarVariants } from "./variants"
import useSidebarStore from "./Sidebar/userSidebarStore"

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
          style={{ backgroundColor: colorBgContainer }}
          className="overflow-hidden"
          variants={sidebarVariants}
          initial="visible"
          animate={open ? "visible" : "hidden"}
        >
          <Sidebar />
        </motion.section>
        <section className="flex flex-col flex-1" style={{ backgroundColor: colorBgBase }}>
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
          <Suspense fallback={<ContentLoading delay={300} />}>
            <main
              css={css`
                flex-grow: 1;
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
