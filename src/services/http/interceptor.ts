import axios from "axios"
import errorService from "@/services/error"
import { HttpRestResponse } from "./response"

export function errorHandling(error: any) {
  if (error.response) {
    const { message } = error.response.data as HttpRestResponse<unknown>
    errorService.submitError(new Error(message))
    return Promise.reject(error)
  }

  if (error.request && axios.isCancel(error)) {
    return Promise.resolve()
  }

  errorService.submitError(error)
  return Promise.reject(error)
}
