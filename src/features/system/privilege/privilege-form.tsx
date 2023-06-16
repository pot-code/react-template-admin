import { Button, Form, Input, Space } from "antd"
import { Privilege } from "./types"

interface PrivilegeFormProps {
  data: Partial<Privilege>
  isLoading?: boolean
  onSubmit: (data: Privilege) => void
  onCancel: () => void
}

export default function PrivilegeForm({ data, isLoading, onSubmit, onCancel }: PrivilegeFormProps) {
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
      <Form.Item name="menuId" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="权限标识" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Space>
          <Button loading={isLoading} type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
