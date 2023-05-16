import { Spin, SpinProps } from "antd"

interface ContentLoadingProps extends SpinProps {}

export default function ContentLoading(props: ContentLoadingProps) {
  return (
    <div className="w-full h-full center-child">
      <Spin {...props} />
    </div>
  )
}
