import React from "react"
import Dashboard from "@/layout/Dashboard"
import Home from "@/views/home"
import Appearance from "@/views/settings/appearance"
import Info from "@/views/settings/info"
import { RouteSchema } from "./type"

export const settingSchema: RouteSchema = {
  path: "settings",
  label: "设置",
  hiddenInMenu: true,
  children: [
    {
      path: "user-center",
      label: "个人中心",
      element: React.createElement(Info),
    },
    {
      path: "appearance",
      label: "外观设置",
      element: React.createElement(Appearance),
    },
  ],
}

export const dashboardSchema: RouteSchema = {
  path: "/",
  element: React.createElement(Dashboard),
  children: [
    {
      path: "",
      label: "首页",
      element: React.createElement(Home),
    },
    settingSchema,
  ],
}
