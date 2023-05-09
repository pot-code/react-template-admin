import http from "@/lib/http"

export const demoApi = {
  hello: (signal?: AbortSignal) => http.get<string>("/hello", { signal }),
}
