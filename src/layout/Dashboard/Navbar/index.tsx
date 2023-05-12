import { css } from "@emotion/react"
import { Layout, theme } from "antd"
import { useQuery } from "react-query"
import { userApi } from "@/features/user/api"
import UserSettings from "./UserSettings"
import Logo from "./Logo"

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
        <UserSettings data={data?.data} />
      </div>
    </Header>
  )
}
