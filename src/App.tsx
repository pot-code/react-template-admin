import { ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"
import { isEmpty } from "lodash-es"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import PageLoading from "./components/page-loading"
import useRouter from "./router/use-router"
import useTheme from "./theme/use-theme"

export default function App() {
  const { isLoading, routes } = useRouter()
  const { algorithm, color } = useTheme()

  let child = <PageLoading />
  if (!isLoading && !isEmpty(routes)) {
    const router = createBrowserRouter(routes)
    child = <RouterProvider router={router} />
  }
  return (
    <ConfigProvider theme={{ algorithm, token: { colorPrimary: color } }} locale={zhCN}>
      {child}
    </ConfigProvider>
  )
}
