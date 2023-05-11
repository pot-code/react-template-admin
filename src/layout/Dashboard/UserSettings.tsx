import { Avatar, Dropdown, MenuProps } from "antd"
import { UserInfo } from "@/features/user/type"
import { routeSchemaToMenuItem } from "./util"
import { userSettingsSchemas } from "@/router/schemas"

export interface UserSettingsProps {
  data?: UserInfo
}

export default function UserSettings({ data }: UserSettingsProps) {
  const navigate = useNavigate()
  const items = useMemo(() => userSettingsSchemas.map(routeSchemaToMenuItem), [])

  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key)
  }

  if (!data) return null

  return (
    <Dropdown menu={{ items, onClick }}>
      <div className="flex items-center gap-2">
        <Avatar src={data.avatar} />
        <span className="text-base">{data.username}</span>
      </div>
    </Dropdown>
  )
}
