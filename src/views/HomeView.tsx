import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { demoApi } from "@/features/app/api"
import DemoComp from "@/components/demo-comp"

function Home() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(["hello"], ({ signal }) => demoApi.hello(signal))

  if (isLoading) return <h1 className="text-gray-5">loading</h1>

  if (data?.data) return <DemoComp title={t(data.data)} />

  return null
}

export default Home
