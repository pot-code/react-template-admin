import { css } from "@emotion/react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { theme } from "antd"

const { useToken } = theme

interface RadioGroupItemProps {
  value: string
}

function RadioGroupItem({ value }: RadioGroupItemProps) {
  const {
    token: { colorBgContainer, controlHeight },
  } = useToken()

  return (
    <RadioGroup.Item
      className="flex flex-col items-center justify-center relative border-none p-1"
      css={css`
        height: ${controlHeight}px;
        width: ${controlHeight}px;
        border-radius: 50%;
        background-clip: content-box;
      `}
      style={{ backgroundColor: value }}
      value={value}
    >
      <RadioGroup.Indicator
        css={css`
          border-radius: 50%;
          height: 60%;
          width: 60%;
        `}
        style={{ backgroundColor: colorBgContainer }}
      />
    </RadioGroup.Item>
  )
}

export interface ColorRadioGroupProps extends RadioGroup.RadioGroupProps {
  colors: string[]
}

export default function ColorRadioGroup({ colors, ...rest }: ColorRadioGroupProps) {
  return (
    <RadioGroup.Root className="flex gap-2" {...rest}>
      {colors.map((color) => (
        <RadioGroupItem key={color} value={color} />
      ))}
    </RadioGroup.Root>
  )
}
