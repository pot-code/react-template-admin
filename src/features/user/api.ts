import http from "@/core/http"
import { UserInfo } from "./type"

export const userApi = {
  info: (signal?: AbortSignal) => http.get<UserInfo>("/user/info", { signal, baseURL: "/mock" }),
}
