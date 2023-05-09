/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_WDYR_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
