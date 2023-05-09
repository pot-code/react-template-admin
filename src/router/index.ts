import { createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import { toReactRouterRoute } from "./util"

const router = createBrowserRouter(routes.map(toReactRouterRoute))
export default router
