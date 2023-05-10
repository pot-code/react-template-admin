import { Spin, SpinProps } from "antd"

interface PageLoadingProps extends SpinProps {}

export default function PageLoading(props: PageLoadingProps) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Spin {...props} />
    </div>
  )
}
