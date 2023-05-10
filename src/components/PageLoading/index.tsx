import { Spin } from "antd"

export default function PageLoading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Spin />
    </div>
  )
}
