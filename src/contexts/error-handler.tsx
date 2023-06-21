import { message } from "antd"
import { createContext, useContext, useMemo } from "react"
import error from "@/services/error"

interface ErrorHandlerProviderContextState {}

const Context = createContext<ErrorHandlerProviderContextState | null>(null)

interface ErrorHandlerProviderProps {
  children: React.ReactNode
}

export function ErrorHandlerProvider({ children }: ErrorHandlerProviderProps) {
  const [messageApi, contextHolder] = message.useMessage()
  const value = useMemo(() => ({}), [])

  useEffect(() => {
    const sub = error.subscribe((e) => {
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
