import { css } from "@emotion/react"
import { Spin, SpinProps, theme } from "antd"

const { useToken } = theme

interface PageLoadingProps extends SpinProps {}

export default function PageLoading(props: PageLoadingProps) {
  const {
    token: { colorBgContainer },
  } = useToken()

  return (
    <div
      css={css`
        background: ${colorBgContainer};
      `}
      className="h-screen w-screen flex flex-col justify-center items-center"
    >
      <Spin {...props} />
    </div>
  )
}
