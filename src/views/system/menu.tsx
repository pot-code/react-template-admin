import { Button, Card, Col, Empty, Modal, Row, theme } from "antd"
import useMenu from "@/features/system/menu/useMenu"
import ContentLoading from "@/components/ContentLoading"
import SchemaForm from "@/features/system/menu/SchemaForm"
import TreeView from "@/features/system/menu/TreeView"

const { useToken } = theme

export function Menu() {
  const {
    openModal,
    isLoading,
    treeNodes,
    selectedRoute,
    onSelect,
    onAddChild,
    onDeleteNode,
    onModalOk,
    onModalCancel,
  } = useMenu()
  const {
    token: { padding },
  } = useToken()

  if (isLoading) return <ContentLoading />

  return (
    <Row className="h-full" gutter={padding}>
      <Col span={6}>
        <Card className="h-full" title="菜单树" type="inner" extra={<Button type="link">保存</Button>}>
          <TreeView
            showLine
            treeData={treeNodes}
            selectedKeys={selectedRoute ? [selectedRoute.id!] : []}
            onSelect={onSelect}
            onAddChild={onAddChild}
            onDeleteNode={onDeleteNode}
          />
          <Modal title="确认删除" okType="danger" open={openModal} onOk={onModalOk} onCancel={onModalCancel}>
            <p>确认删除该菜单？其所有子节点也会一并删除</p>
          </Modal>
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
