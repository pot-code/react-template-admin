export interface HttpRestResponse<T> {
  data: T
  message: string
  code: number
}
