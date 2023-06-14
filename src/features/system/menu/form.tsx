import { Button, Form, Input, InputNumber, Space, Switch } from "antd"
import { RouteSchema } from "./schema"

export interface SchemaFormProps {
  data: RouteSchema
  isLoading?: boolean
  showCancel?: boolean
  onSubmit: (data: RouteSchema) => void
  onCancel?: () => void
}

export default function SchemaForm({ data, isLoading, showCancel, onSubmit, onCancel }: SchemaFormProps) {
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
      <Form.Item name="parentId" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="label" label="菜单名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="order" label="排序" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="hiddenInMenu" label="是否隐藏" valuePropName="checked" tooltip="是否在菜单里隐藏">
        <Switch />
      </Form.Item>
      <Form.Item name="path" label="路由地址" tooltip="地址为空可用于 layout 组件或 index 路由">
        <Input />
      </Form.Item>
      <Form.Item name="viewPath" label="视图地址" tooltip="不用添加 views 文件夹前缀">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Space>
          <Button loading={isLoading} type="primary" htmlType="submit">
            保存
          </Button>
          {showCancel && <Button onClick={onCancel}>取消</Button>}
        </Space>
      </Form.Item>
    </Form>
  )
}
