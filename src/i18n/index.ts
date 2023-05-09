import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  zh: {
    translation: {
      hello: "你好，世界",
      start: "开始",
    },
  },
  en: {
    translation: {
      hello: "hello world",
      start: "start",
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
