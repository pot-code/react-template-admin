import http from "@/core/http"

export const demoApi = {
  hello: (signal?: AbortSignal) => http.get<string>("/hello", { signal, baseURL: "/mock" }),
}
