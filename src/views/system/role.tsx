import { Button, Col, Form, Input, Row, Space, Table, theme } from "antd"
import useRole from "@/features/system/role/use-role"

const { useToken } = theme

export default function Menu() {
  const {
    token: { padding },
  } = useToken()
  const {} = useRole()

  return (
    <div>
      <Form>
        <Row gutter={padding}>
          <Col offset={16} span={8}>
            <Space>
              <Form.Item name="name" label="角色名">
                <Input placeholder="请输入角色名" />
              </Form.Item>
              <Form.Item>
                <Button type="primary">搜索</Button>
              </Form.Item>
              <Form.Item>
                <Button>重置</Button>
              </Form.Item>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table />
    </div>
  )
}
