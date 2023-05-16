import { Form, Input, InputNumber, Switch } from "antd"
import { RouteSchema } from "@/router/schema/type"

export interface SchemaFormProps {
  data: RouteSchema
}

export default function SchemaForm({ data }: SchemaFormProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
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
      <Form.Item name="hiddenInMenu" label="是否隐藏" valuePropName="checked" tooltip="是否在菜单里隐藏">
        <Switch />
      </Form.Item>
      <Form.Item name="path" label="路由地址" tooltip="地址为空可表示框架组件或 index 路由">
        <Input />
      </Form.Item>
      <Form.Item name="viewPath" label="视图地址" tooltip="不用添加 views 文件夹前缀">
        <Input />
      </Form.Item>
    </Form>
  )
}
