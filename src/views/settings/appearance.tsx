import { Card, Form, Switch } from "antd"
import useTheme from "@/theme/useTheme"
import { ThemeMode } from "@/theme/type"
import ColorRadioGroup from "@/features/settings/ColorRadioGroup"
import { COLOR_PALETTE } from "@/theme/config"

export default function Appearance() {
  const { color, mode, compact, toggleCompactMode, toggleThemeMode, setColor } = useTheme()

  const onThemeColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor)
    },
    [setColor],
  )

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
          <Form.Item label="紧凑模式">
            <Switch checked={compact} onChange={() => toggleCompactMode()} />
          </Form.Item>
          <Form.Item label="主题色">
            <ColorRadioGroup colors={COLOR_PALETTE} defaultValue={color} onValueChange={onThemeColorChange} />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
