import { css } from "@emotion/react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { theme } from "antd"

const { useToken } = theme

interface RadioGroupItemProps {
  value: string
}

function RadioGroupItem({ value }: RadioGroupItemProps) {
  const {
    token: { controlHeight },
  } = useToken()

  return (
    <RadioGroup.Item
      className="relative border-none p-1"
      css={css`
        height: ${controlHeight}px;
        width: ${controlHeight}px;
        border-radius: 50%;
        background-color: ${value};
        background-clip: content-box;
        transform-style: preserve-3d;
      `}
      value={value}
    >
      <RadioGroup.Indicator
        css={css`
          border-radius: 50%;
          transform: translateZ(-1px);
          padding: 2px;
          background-color: #ffdee9;
          background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
        `}
        className="absolute top-0 left-0 h-full w-full block shadow"
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
