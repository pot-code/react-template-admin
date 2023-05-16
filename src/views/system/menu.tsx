import { Card, Col, Empty, Row } from "antd"
import useMenu from "@/features/system/menu/useMenu"
import ContentLoading from "@/components/ContentLoading"
import SchemaForm from "@/features/system/menu/SchemaForm"
import TreeView from "@/features/system/menu/TreeView"

export function Menu() {
  const { isLoading, treeNodes, selectedRoute, onSelect } = useMenu()

  if (isLoading) return <ContentLoading />

  return (
    <Row gutter={8}>
      <Col span={6}>
        <Card className="h-full" title="菜单树" type="inner">
          <TreeView showLine treeData={treeNodes} onSelect={onSelect} />
        </Card>
      </Col>
      <Col span={18}>
        <Card title="设置" type="inner">
          {selectedRoute ? (
            <SchemaForm data={selectedRoute} />
          ) : (
            <div className="center-child">
              <Empty description="请选择菜单" />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  )
}
