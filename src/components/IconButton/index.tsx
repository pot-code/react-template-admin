import { css } from "@emotion/react"
import { theme } from "antd"

const { useToken } = theme

export interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon: React.ReactNode
}

export default function IconButton({ icon, ...rest }: IconButtonProps) {
  const {
    token: { colorFillSecondary },
  } = useToken()

  return (
    <button
      css={css`
        &:hover {
          background-color: ${colorFillSecondary};
        }
      `}
      className="transition-colors bg-transparent border-none p-2 flex rounded cursor-pointer"
      {...rest}
    >
      {icon}
    </button>
  )
}
