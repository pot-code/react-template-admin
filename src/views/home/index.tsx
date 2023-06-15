import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { demoApi } from "@/features/app/api"

function Home() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(["hello"], ({ signal }) => demoApi.hello(signal))

  if (isLoading) return <div className="text-gray-400">loading</div>

  if (data?.data) return <div className="text-pink-500">{t(data.data)}</div>

  return null
}

export default Home
