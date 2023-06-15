import { Card, Col, Empty, Row, Tree, theme } from "antd"
import PrivilegeTable from "@/features/system/privilege/privilege-table"
import usePrivilege from "@/features/system/privilege/use-privilege"

const { useToken } = theme

export default function Privilege() {
  const {
    token: { padding },
  } = useToken()
  const { data, pagination, isLoading, treeNodes, selectedMenu, onTreeNodeSelect } = usePrivilege()

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
        <Card title="权限设置" type="inner">
          {selectedMenu ? (
            <PrivilegeTable isLoading={isLoading} data={data} pagination={pagination} />
          ) : (
            <Empty description="请选择菜单" />
          )}
        </Card>
      </Col>
    </Row>
  )
}
