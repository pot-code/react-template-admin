import { Card, Col, Row, Tree } from "antd"
import useMenu from "@/features/system/menu/useMenu"
import ContentLoading from "@/components/ContentLoading"
import SchemaForm from "@/features/system/menu/SchemaForm"

export function Menu() {
  const { isLoading, treeRenderData, selectedRoute, onSelect } = useMenu()

  if (isLoading) return <ContentLoading />

  return (
    <Row gutter={8}>
      <Col span={6}>
        <Card title="菜单树" type="inner">
          <div>
            <Tree showLine treeData={treeRenderData} onSelect={onSelect} />
          </div>
        </Card>
      </Col>
      <Col span={18}>
        <Card title="设置" type="inner">
          <SchemaForm data={selectedRoute} />
        </Card>
      </Col>
    </Row>
  )
}
