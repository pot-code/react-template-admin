import { Avatar, Dropdown, MenuProps, theme } from "antd"
import { curry } from "lodash-es"
import { AiFillCaretDown } from "react-icons/ai"
import { RouteSchema, SETTINGS_ID, settings } from "@/features/system/menu/schema"
import { UserInfo } from "@/features/user/type"
import { MenuItem } from "../type"

const { useToken } = theme

function routeSchemaToMenuItem(prefix: string, schema: RouteSchema) {
  return {
    key: `${prefix}/${schema.path}`,
    label: schema.label,
  } as MenuItem
}

export interface SettingsMenuProps {
  data?: UserInfo
}

export default function SettingsMenu({ data }: SettingsMenuProps) {
  const navigate = useNavigate()
  const {
    token: { colorBgSpotlight },
  } = useToken()
  const items = useMemo(() => {
    return settings.filter((v) => v.parentId === SETTINGS_ID).map(curry(routeSchemaToMenuItem)(SETTINGS_ID))
  }, [])

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
