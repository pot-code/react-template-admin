import { createContext, useContext, useMemo } from "react"
import { message } from "antd"
import { debounceTime } from "rxjs"
import { errorSubject } from "@/observables/error"
import { Time } from "@/utils/duration"

interface ErrorHandlerProviderContextState {}

const Context = createContext<ErrorHandlerProviderContextState | null>(null)

interface ErrorHandlerProviderProps {
  children: React.ReactNode
}

export function ErrorHandlerProvider({ children }: ErrorHandlerProviderProps) {
  const [messageApi, contextHolder] = message.useMessage()
  const value = useMemo(() => ({}), [])

  useEffect(() => {
    const sub = errorSubject.pipe(debounceTime(100 * Time.Milliseconds)).subscribe((e) => {
      messageApi.error(e.message)
    })
    return () => sub.unsubscribe()
  })

  return (
    <Context.Provider value={value}>
      {children}
      {contextHolder}
    </Context.Provider>
  )
}

export function useErrorHandler() {
  const context = useContext(Context)

  if (!context) {
    throw new Error("useErrorHandler must be used within a ErrorHandlerProvider")
  }

  return context
}
