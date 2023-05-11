import { ConfigProvider } from "antd"
import { isEmpty } from "lodash-es"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import PageLoading from "./components/PageLoading"
import useRouter from "./router/useRouter"
import useTheme from "./theme/useTheme"

export default function App() {
  const { isLoading, routes } = useRouter()
  const { algorithm } = useTheme()

  let child = <PageLoading />
  if (!isLoading && !isEmpty(routes)) {
    const router = createBrowserRouter(routes)
    child = <RouterProvider router={router} />
  }
  return <ConfigProvider theme={{ algorithm }}>{child}</ConfigProvider>
}
