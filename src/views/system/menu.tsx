import { Card, Col, Empty, Modal, Row, theme } from "antd"
import useMenu from "@/features/system/menu/use-menu"
import ContentLoading from "@/components/content-loading"
import SchemaForm from "@/features/system/menu/form"
import TreeView from "@/features/system/menu/menu-tree"

const { useToken } = theme

export function Menu() {
  const {
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    showCreateMenuModal,
    showDeleteConfirmModal,
    unSavedSchema,
    selectedRoute,
    treeNodes,
    contextHolder,
    onSelect,
    onAddChild,
    onDeleteNode,
    onDeleteModalOk,
    onDeleteModalCancel,
    onRouteSchemaCreated,
    onRouteSchemaUpdated,
    onCreationCanceled,
  } = useMenu()
  const {
    token: { padding },
  } = useToken()

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
            confirmLoading={isDeleting}
            open={showDeleteConfirmModal}
            onOk={onDeleteModalOk}
            onCancel={onDeleteModalCancel}
          >
            <p>确认删除该菜单？其所有子节点也会一并删除</p>
          </Modal>
          <Modal title="新增菜单" footer={null} open={showCreateMenuModal}>
            <SchemaForm
              showCancel
              isLoading={isCreating}
              data={unSavedSchema!}
              onSubmit={onRouteSchemaCreated}
              onCancel={onCreationCanceled}
            />
          </Modal>
        </Card>
      </Col>
      <Col span={18}>
        <Card title="设置" type="inner">
          {selectedRoute ? (
            <SchemaForm isLoading={isUpdating} data={selectedRoute} onSubmit={onRouteSchemaUpdated} />
          ) : (
            <Empty description="请选择菜单" />
          )}
        </Card>
      </Col>
      {contextHolder}
    </Row>
  )
}
