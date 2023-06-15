import { Card, Col, Empty, Modal, Row, Tree, theme } from "antd"
import PrivilegeTable from "@/features/system/privilege/privilege-table"
import usePrivilege from "@/features/system/privilege/use-privilege"
import PrivilegeForm from "@/features/system/privilege/privilege-form"

const { useToken } = theme

export default function Privilege() {
  const {
    token: { padding },
  } = useToken()
  const {
    isLoading,
    isCreating,
    showCreateModal,
    data,
    pagination,
    treeNodes,
    selectedMenu,
    onChange,
    onTreeNodeSelect,
    onCreateCancel,
    onAddPrivilege,
    onCreatePrivilege,
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
            <PrivilegeTable
              loading={isLoading}
              dataSource={data}
              pagination={pagination}
              onChange={onChange}
              onAddPrivilege={onAddPrivilege}
            />
          ) : (
            <Empty description="请选择菜单" />
          )}
        </Card>
      </Col>
      <Modal title="新增权限" open={showCreateModal} onCancel={onCreateCancel} footer={null}>
        {/* <PrivilegeForm isLoading={isCreating} onSubmit={onCreatePrivilege} onCancel={onCreateCancel} /> */}
      </Modal>
    </Row>
  )
}
