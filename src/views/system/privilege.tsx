import { Button, Card, Col, Empty, Modal, Row, Tree, theme } from "antd"
import PrivilegeTable from "@/features/system/privilege/privilege-table"
import usePrivilege from "@/features/system/privilege/use-privilege"
import PrivilegeForm from "@/features/system/privilege/privilege-form"

const { useToken } = theme

export default function Privilege() {
  const {
    token: { padding, margin },
  } = useToken()
  const {
    isSubmitting,
    showModal,
    contextHolder,
    draftPrivilege,
    treeNodes,
    selectedMenu,
    onSubmit,
    onTreeNodeSelect,
    onModalCancel,
    onAddPrivilege,
    onDeletePrivilege,
    onEditPrivilege,
  } = usePrivilege()

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
            <div>
              <div style={{ marginBottom: `${margin}px` }}>
                <Button type="primary" onClick={onAddPrivilege}>
                  新增
                </Button>
              </div>
              <PrivilegeTable menuId={selectedMenu.id} onEditRow={onEditPrivilege} onDeleteRow={onDeletePrivilege} />
            </div>
          ) : (
            <Empty description="请选择菜单" />
          )}
        </Card>
      </Col>
      <Modal title="新增权限" open={showModal} footer={null}>
        <PrivilegeForm isSubmitting={isSubmitting} data={draftPrivilege} onSubmit={onSubmit} onCancel={onModalCancel} />
      </Modal>
      {contextHolder}
    </Row>
  )
}
