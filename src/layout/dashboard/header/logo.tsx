import { theme } from "antd"
import logo from "@/assets/logo.png"

const { useToken } = theme

export default function Logo() {
  const {
    token: { colorTextSecondary, controlHeightLG },
  } = useToken()

  return (
    <div className="flex gap-4 items-center">
      <img alt="logo" src={logo} height={controlHeightLG} />
      <span style={{ color: colorTextSecondary }}>React Admin</span>
    </div>
  )
}
