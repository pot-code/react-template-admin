import { Avatar, Dropdown, MenuProps, theme } from "antd"
import { curry } from "lodash-es"
import { CaretDownFilled } from "@ant-design/icons"
import { UserInfo } from "@/features/user/type"
import { MenuItem } from "../type"
import { RouteSchema, settings, SETTINGS_ID } from "@/router"

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
    return settings().map(curry(routeSchemaToMenuItem)(SETTINGS_ID))
  }, [])

  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key)
  }

  if (!data) return null

  return (
    <Dropdown menu={{ items, onClick }}>
      <div className="flex items-center gap-2">
        <Avatar src={data.avatar} />
        <CaretDownFilled color={colorBgSpotlight} />
      </div>
    </Dropdown>
  )
}
