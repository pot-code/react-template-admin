import { css } from "@emotion/react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { theme } from "antd"
import { motion } from "framer-motion"

const { useToken } = theme
const indicatorVariants = {
  checked: { scale: 1 },
  unchecked: { scale: 0 },
}

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
          height: 60%;
          width: 60%;
        `}
      >
        <motion.div
          style={{
            backgroundColor: colorBgContainer,
          }}
          className="w-full h-full rounded-full"
          variants={indicatorVariants}
          initial="unchecked"
          animate="checked"
        />
      </RadioGroup.Indicator>
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
