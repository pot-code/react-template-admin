import { Avatar, Dropdown, MenuProps, theme } from "antd"
import { AiFillCaretDown } from "react-icons/ai"
import { UserInfo } from "@/features/user/type"
import { userSettingsSchemas } from "@/router/schemas"
import { routeSchemaToMenuItem } from "../util"

const { useToken } = theme

export interface UserSettingsProps {
  data?: UserInfo
}

export default function UserSettings({ data }: UserSettingsProps) {
  const navigate = useNavigate()
  const {
    token: { colorBgTextActive },
  } = useToken()
  const items = useMemo(() => userSettingsSchemas.map(routeSchemaToMenuItem), [])

  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key)
  }

  if (!data) return null

  return (
    <Dropdown menu={{ items, onClick }}>
      <div className="flex items-center gap-2">
        <Avatar src={data.avatar} />
        <AiFillCaretDown color={colorBgTextActive} />
      </div>
    </Dropdown>
  )
}
