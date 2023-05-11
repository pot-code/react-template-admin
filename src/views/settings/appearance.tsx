import { Card, Form, Switch } from "antd"
import useTheme from "@/theme/useTheme"
import { ThemeMode } from "@/theme/type"

export default function Appearance() {
  const { mode, toggleThemeMode } = useTheme()

  return (
    <div>
      <Card>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}>
          <Form.Item label="主题模式">
            <Switch
              checkedChildren="暗黑"
              unCheckedChildren="纯白"
              checked={mode === ThemeMode.Dark}
              onChange={() => toggleThemeMode()}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
