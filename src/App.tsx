import { isEmpty } from "lodash-es"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PageLoading from "./components/PageLoading"
import useRouter from "./router/useRouter"

export default function App() {
  const { isLoading, routes } = useRouter()

  if (isLoading || isEmpty(routes)) return <PageLoading />

  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}
