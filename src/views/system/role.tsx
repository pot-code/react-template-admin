import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Modal, Row, Space, theme } from "antd"
import RoleForm from "@/features/system/role/role-form"
import RoleTable from "@/features/system/role/role-table"
import useRole from "@/features/system/role/use-role"

const { useToken } = theme

export default function Menu() {
  const [form] = Form.useForm()
  const {
    token: { padding },
  } = useToken()
  const {
    isSubmitting,
    showModal,
    contextHolder,
    pagination,
    draftRole,
    data,
    onSearch,
    onSubmit,
    onAddRole,
    onEditRole,
    onDeleteRole,
    onModalCancel,
    onTableChange,
  } = useRole()

  return (
    <div>
      <Form form={form} onFinish={onSearch}>
        <Row gutter={padding}>
          <Col span={8}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={onAddRole}>
                新增
              </Button>
            </Space>
          </Col>
          <Col offset={8} span={8} className="text-right">
            <Space>
              <Form.Item name="name" label="角色名">
                <Input placeholder="请输入角色名" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={() => form.resetFields()}>重置</Button>
              </Form.Item>
            </Space>
          </Col>
        </Row>
      </Form>
      <RoleTable
        data={data}
        pagination={pagination}
        onEditRow={onEditRole}
        onDeleteRow={onDeleteRole}
        onTableChange={onTableChange}
      />
      <Modal open={showModal} title="新增角色" footer={null} onCancel={onModalCancel}>
        <RoleForm isSubmitting={isSubmitting} data={draftRole} onSubmit={onSubmit} onCancel={onModalCancel} />
      </Modal>
      {contextHolder}
    </div>
  )
}
