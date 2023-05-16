import { Spin, SpinProps, theme } from "antd"

const { useToken } = theme

interface PageLoadingProps extends SpinProps {}

export default function PageLoading(props: PageLoadingProps) {
  const {
    token: { colorBgContainer },
  } = useToken()

  return (
    <div
      style={{
        backgroundColor: colorBgContainer,
      }}
      className="h-screen w-screen center-child"
    >
      <Spin {...props} />
    </div>
  )
}
