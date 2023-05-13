import { Avatar, Dropdown, MenuProps, theme } from "antd"
import { AiFillCaretDown } from "react-icons/ai"
import { curry } from "lodash-es"
import { UserInfo } from "@/features/user/type"
import { routeSchemaToMenuItem } from "./util"
import { settingSchema } from "@/router/schema"
import TreeUtil from "@/router/schema/TreeUtil"

const { useToken } = theme

export interface UserSettingsProps {
  data?: UserInfo
}

export default function UserSettings({ data }: UserSettingsProps) {
  const navigate = useNavigate()
  const {
    token: { colorBgSpotlight },
  } = useToken()
  const items = useMemo(
    () => new TreeUtil(settingSchema).map(curry(routeSchemaToMenuItem)(settingSchema.path)).root.children,
    [],
  )

  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key)
  }

  if (!data) return null

  return (
    <Dropdown menu={{ items, onClick }}>
      <div className="flex items-center gap-2">
        <Avatar src={data.avatar} />
        <AiFillCaretDown color={colorBgSpotlight} />
      </div>
    </Dropdown>
  )
}
