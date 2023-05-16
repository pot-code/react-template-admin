import * as d3 from "d3"
import { Avatar, Dropdown, MenuProps, theme } from "antd"
import { cloneDeep, curry } from "lodash-es"
import { AiFillCaretDown } from "react-icons/ai"
import { UserInfo } from "@/features/user/type"
import { SETTINGS_ID, settingSchemas } from "@/router/schema"
import TreeUtil from "@/utils/tree-util"
import { RouteSchema } from "@/router/schema/type"
import { MenuItem } from "../type"
import { routeSchemasToTree } from "@/router/schema/util"

const { useToken } = theme

function routeSchemaToMenuItem(prefix: string, route: d3.HierarchyNode<RouteSchema>) {
  const schema = route.data
  return {
    key: `${prefix}/${schema.path}`,
    label: schema.label,
  } as MenuItem
}

export interface UserSettingsProps {
  data?: UserInfo
}

export default function UserSettings({ data }: UserSettingsProps) {
  const navigate = useNavigate()
  const {
    token: { colorBgSpotlight },
  } = useToken()
  const items = useMemo(() => {
    const copyOfSettingSchemas = cloneDeep(settingSchemas)
    copyOfSettingSchemas[0].parentId = ""
    return new TreeUtil(routeSchemasToTree(copyOfSettingSchemas)).map(curry(routeSchemaToMenuItem)(SETTINGS_ID)).result
      .children
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
