import http from "@/lib/http"
import { RemoteRouteSchema } from "./type"

export const routeApi = {
  list() {
    return http.get<RemoteRouteSchema[]>("/routes")
  },
}
