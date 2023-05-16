import { Button, Form, Input, InputNumber } from "antd"
import { RouteSchema } from "@/router/schema/type"

export interface SchemaFormProps {
  data: RouteSchema
}

export default function SchemaForm({ data }: SchemaFormProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <Form style={{ width: 600 }} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item name="label" label="菜单名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="order" label="排序" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name="path" label="路由地址" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="viewPath" label="视图地址">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary">保存</Button>
      </Form.Item>
    </Form>
  )
}
