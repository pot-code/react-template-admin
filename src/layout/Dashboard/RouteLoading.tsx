import { Spin, SpinProps } from "antd"

interface RouteLoadingProps extends SpinProps {}

export default function RouteLoading(props: RouteLoadingProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Spin {...props} />
    </div>
  )
}
