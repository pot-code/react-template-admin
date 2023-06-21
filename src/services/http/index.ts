import axios from "axios"
import { errorHandling } from "./interceptor"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

http.interceptors.response.use(null, errorHandling)

export default http
