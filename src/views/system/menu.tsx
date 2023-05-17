import { Card, Col, Empty, Row, theme } from "antd"
import useMenu from "@/features/system/menu/useMenu"
import ContentLoading from "@/components/ContentLoading"
import SchemaForm from "@/features/system/menu/SchemaForm"
import TreeView from "@/features/system/menu/TreeView"

const { useToken } = theme

export function Menu() {
  const { isLoading, treeNodes, selectedRoute, onSelect, onAddChild, onDeleteNode } = useMenu()
  const {
    token: { padding },
  } = useToken()

  if (isLoading) return <ContentLoading />

  return (
    <Row className="h-full" gutter={padding}>
      <Col span={6}>
        <Card className="h-full" title="菜单树" type="inner">
          <TreeView
            showLine
            treeData={treeNodes}
            onSelect={onSelect}
            onAddChild={onAddChild}
            onDeleteNode={onDeleteNode}
          />
        </Card>
      </Col>
      <Col span={18}>
        <Card title="设置" type="inner">
          {selectedRoute ? <SchemaForm data={selectedRoute} /> : <Empty description="请选择菜单" />}
        </Card>
      </Col>
    </Row>
  )
}
