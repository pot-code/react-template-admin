import { Spin } from "antd"

export default function RouteLoading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Spin />
    </div>
  )
}
