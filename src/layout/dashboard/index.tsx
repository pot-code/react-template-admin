import { css } from "@emotion/react"
import { IconLayoutSidebar } from "@tabler/icons-react"
import { Breadcrumb, theme } from "antd"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import useBreadcrumb from "@/layout/dashboard/use-breadcrumb"
import IconButton from "@/components/icon-button"
import ContentLoading from "@/components/content-loading"
import Header from "./header"
import Sidebar from "./sidebar"
import useSidebarStore from "./sidebar/use-sidebar-store"
import { sidebarVariants } from "./variants"

const { useToken } = theme

export default function Dashboard() {
  const { items: breadcrumbItems } = useBreadcrumb()
  const { open, setOpen } = useSidebarStore()
  const {
    token: { colorPrimary, colorBgContainer, colorBgBase, colorBorderSecondary, fontSize, padding },
  } = useToken()

  function toggleSidebarOpen(next?: boolean) {
    setOpen(next ?? !open)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
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
            <IconButton
              icon={<IconLayoutSidebar size={fontSize} color={colorPrimary} />}
              onClick={() => toggleSidebarOpen()}
            />
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
