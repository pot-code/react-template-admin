export default function useGoBack() {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  return {
    goBack,
  }
}
