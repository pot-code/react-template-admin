import React from "react"

async function installMockService() {
  return import("../mock/browser").then(({ createWorker }) => createWorker()).then((worker) => worker.start())
}

async function installWdyr() {
  const { default: wdyr } = await import("@welldone-software/why-did-you-render")
  wdyr(React, {
    exclude: [/^BrowserRouter/, /^Link/, /^Route/],
    trackHooks: true,
    trackAllPureComponents: true,
  })
}

export async function setup() {
  if (import.meta.env.VITE_MSW_ENABLED === "true") {
    await installMockService()
  }
  if (import.meta.env.VITE_WDYR_ENABLED === "true") {
    await installWdyr()
  }
}
