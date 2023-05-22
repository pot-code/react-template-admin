import { Card, Col, Empty, Modal, Row, theme } from "antd"
import useMenu from "@/features/system/menu/useMenu"
import ContentLoading from "@/components/ContentLoading"
import SchemaForm from "@/features/system/menu/SchemaForm"
import TreeView from "@/features/system/menu/TreeView"

const { useToken } = theme

export function Menu() {
  const {
    contextHolder,
    showDeleteConfirmModal,
    confirmDeleteLoading,
    showCreateMenuModal,
    confirmCreateLoading,
    isLoading,
    treeNodes,
    unSavedSchema,
    selectedRoute,
    onSelect,
    onAddChild,
    onDeleteNode,
    onDeleteModalOk,
    onDeleteModalCancel,
    onCreateModalOk,
    onCreateModalCancel,
  } = useMenu()
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
            selectedKeys={selectedRoute ? [selectedRoute.id!] : []}
            onSelect={onSelect}
            onAddChild={onAddChild}
            onDeleteNode={onDeleteNode}
          />
          <Modal
            title="确认删除"
            okType="danger"
            confirmLoading={confirmDeleteLoading}
            open={showDeleteConfirmModal}
            onOk={onDeleteModalOk}
            onCancel={onDeleteModalCancel}
          >
            <p>确认删除该菜单？其所有子节点也会一并删除</p>
          </Modal>
          <Modal
            title="新增菜单"
            confirmLoading={confirmCreateLoading}
            open={showCreateMenuModal}
            onOk={onCreateModalOk}
            onCancel={onCreateModalCancel}
          >
            <SchemaForm data={unSavedSchema!} />
          </Modal>
        </Card>
      </Col>
      <Col span={18}>
        <Card title="设置" type="inner">
          {selectedRoute ? <SchemaForm data={selectedRoute} /> : <Empty description="请选择菜单" />}
        </Card>
      </Col>
      {contextHolder}
    </Row>
  )
}
