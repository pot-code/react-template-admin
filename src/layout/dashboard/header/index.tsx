import { css } from "@emotion/react"
import { Layout, theme } from "antd"
import { useQuery } from "@tanstack/react-query"
import { userApi } from "@/features/user/api"
import SettingsMenu from "./settings"
import Logo from "./logo"

const { Header } = Layout

const { useToken } = theme

export default function Navbar() {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = useToken()
  const { data } = useQuery(["user", "info"], ({ signal }) => userApi.info(signal))

  return (
    <Header
      className="flex justify-between items-center"
      css={css`
        background-color: ${colorBgContainer};
        border-bottom: 1px solid ${colorBorderSecondary};
      `}
    >
      <Logo />
      <div className="flex gap-2 items-center">
        <SettingsMenu data={data?.data} />
      </div>
    </Header>
  )
}
