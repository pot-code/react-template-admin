import { Card, Col, Row, Tree, theme } from "antd"
import usePrivilege from "@/features/system/privilege/use-privilege"
import PrivilegeTable from "@/features/system/privilege/privilege-table"

const { useToken } = theme

export default function Privilege() {
  const {
    token: { padding },
  } = useToken()
  const { treeNodes, selectedMenu, onTreeNodeSelect } = usePrivilege()

  return (
    <Row className="h-full" gutter={padding}>
      <Col span={6}>
        <Card className="h-full" title="菜单树" type="inner">
          <Tree
            showLine
            treeData={treeNodes}
            selectedKeys={selectedMenu ? [selectedMenu.id] : []}
            onSelect={onTreeNodeSelect}
          />
        </Card>
      </Col>
      <Col span={18}>
        <Card title="权限信息" type="inner">
          <PrivilegeTable data={[]} />
        </Card>
      </Col>
    </Row>
  )
}
