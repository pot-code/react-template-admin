import { Button, Card, Col, Empty, Modal, Row, Tree, theme } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import PrivilegeForm from "@/features/system/privilege/privilege-form"
import PrivilegeTable from "@/features/system/privilege/privilege-table"
import usePrivilege from "@/features/system/privilege/use-privilege"

const { useToken } = theme

export default function Privilege() {
  const {
    token: { padding, margin },
  } = useToken()
  const {
    isLoading,
    isSubmitting,
    showModal,
    data,
    pagination,
    draftPrivilege,
    treeNodes,
    selectedMenu,
    contextHolder,
    onSubmit,
    onTableChange,
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
        <Card className="h-full" title="权限设置" type="inner">
          {selectedMenu ? (
            <div>
              <div style={{ marginBottom: `${margin}px` }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={onAddPrivilege}>
                  新增
                </Button>
              </div>
              <PrivilegeTable
                isLoading={isLoading}
                data={data}
                pagination={pagination}
                onEditRow={onEditPrivilege}
                onDeleteRow={onDeletePrivilege}
                onTableChange={onTableChange}
              />
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
