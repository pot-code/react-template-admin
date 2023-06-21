import { Button, Form, Input, Space } from "antd"
import { Role } from "./types"

interface RoleFormProps {
  data: Partial<Role>
  isSubmitting?: boolean
  onSubmit: (data: Role) => void
  onCancel: () => void
}

export default function RoleForm({ data, isSubmitting, onSubmit, onCancel }: RoleFormProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="角色名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Space>
          <Button loading={isSubmitting} type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
