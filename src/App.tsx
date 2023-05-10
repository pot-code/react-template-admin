import { ConfigProvider, theme } from "antd"
import { isEmpty } from "lodash-es"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import PageLoading from "./components/PageLoading"
import useRouter from "./router/useRouter"
import { ThemeMode } from "./theme/type"
import useTheme from "./theme/useTheme"

export default function App() {
  const { isLoading, routes } = useRouter()
  const { mode } = useTheme()

  if (isLoading || isEmpty(routes)) return <PageLoading />

  const router = createBrowserRouter(routes)

  return (
    <ConfigProvider theme={{ algorithm: mode === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
