import { css } from "@emotion/react"
import { Layout, Switch, theme } from "antd"
import { useQuery } from "react-query"
import { userApi } from "@/features/user/api"
import { ThemeMode } from "@/theme/type"
import useTheme from "@/theme/useTheme"
import UserSettings from "./UserSettings"

const { Header } = Layout

const { useToken } = theme

export default function Navbar() {
  const { mode, toggleThemeMode } = useTheme()
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
      <span>Logo</span>
      <div className="flex gap-2 items-center">
        <Switch
          checkedChildren="暗黑"
          unCheckedChildren="纯白"
          checked={mode === ThemeMode.Dark}
          onChange={() => toggleThemeMode()}
        />
        <UserSettings data={data?.data} />
      </div>
    </Header>
  )
}
