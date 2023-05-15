import { Card, Col, Row, Tree } from "antd"
import type { TreeProps } from "antd/es/tree"
import useMenu from "@/features/system/menu/useMenu"
import ContentLoading from "@/layout/Dashboard/ContentLoading"

export function Menu() {
  const { treeNodes, isLoading } = useMenu()

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info)
  }

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info)
  }

  if (isLoading) return <ContentLoading />

  return (
    <Row className="h-full" gutter={8}>
      <Col span={6}>
        <Card title="菜单树" type="inner">
          <Tree onSelect={onSelect} onCheck={onCheck} treeData={treeNodes} />
        </Card>
      </Col>
      <Col span={18}>
        <Card className="h-full" title="设置" type="inner" />
      </Col>
    </Row>
  )
}
