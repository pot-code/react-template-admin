import { Card, Col, Dropdown, Empty, Modal, Row, theme } from "antd"
import SchemaForm from "@/features/system/menu/form"
import MenuTree from "@/features/system/menu/menu-tree"
import useMenuTree from "@/features/system/menu/use-menu-tree"

const { useToken } = theme

export function Menu() {
  const {
    token: { padding },
  } = useToken()
  const {
    isCreating,
    isUpdating,
    isDeleting,
    openContextmenu,
    openCreationModal,
    openDeleteConfirmModal,
    treeNodes,
    draftMenu,
    selectedMenu,
    contextmenuPosition,
    contextMenuItems,
    contextHolder,
    onTreeNodeSelect,
    onTreeNodeRightClick,
    onMenuCreated,
    onMenuUpdated,
    onDeleteMenuCancel,
    onDeleteMenuConfirm,
    onCreationCanceled,
    onContextmenuClose,
  } = useMenuTree()

  return (
    <Row className="h-full" gutter={padding}>
      <Col span={6}>
        <Card className="h-full" title="菜单树" type="inner">
          <MenuTree
            showLine
            treeData={treeNodes}
            selectedKeys={selectedMenu ? [selectedMenu.id] : []}
            onSelect={onTreeNodeSelect}
            onRightClick={onTreeNodeRightClick}
          />
          <Modal
            title="确认删除"
            okType="danger"
            confirmLoading={isDeleting}
            open={openDeleteConfirmModal}
            onOk={onDeleteMenuConfirm}
            onCancel={onDeleteMenuCancel}
          >
            <p>确认删除该菜单？其所有子节点也会一并删除</p>
          </Modal>
          <Modal title="新增菜单" footer={null} open={openCreationModal}>
            <SchemaForm
              showCancel
              isLoading={isCreating}
              data={draftMenu!}
              onSubmit={onMenuCreated}
              onCancel={onCreationCanceled}
            />
          </Modal>
          <Dropdown
            trigger={["click"]}
            overlayStyle={{ left: `${contextmenuPosition.x}px`, top: `${contextmenuPosition.y}px` }}
            open={openContextmenu}
            menu={{ items: contextMenuItems }}
            onOpenChange={onContextmenuClose}
          >
            <div className="absolute" />
          </Dropdown>
        </Card>
      </Col>
      <Col span={18}>
        <Card title="设置" type="inner">
          {selectedMenu ? (
            <SchemaForm isLoading={isUpdating} data={selectedMenu} onSubmit={onMenuUpdated} />
          ) : (
            <Empty description="请选择菜单" />
          )}
        </Card>
      </Col>
      {contextHolder}
    </Row>
  )
}
