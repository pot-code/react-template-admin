/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_WDYR_ENABLED: "true" | "false"
  readonly VITE_MSW_ENABLED: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
