import React from "react"
import Dashboard from "@/layout/Dashboard"
import Home from "@/views/home"
import Appearance from "@/views/settings/appearance"
import Info from "@/views/settings/info"
import { RouteSchema } from "./type"

export const userSettingsSchemas: RouteSchema[] = [
  {
    path: "info",
    label: "个人中心",
    hiddenInMenu: true,
    element: React.createElement(Info),
  },
  {
    path: "appearance",
    label: "外观设置",
    hiddenInMenu: true,
    element: React.createElement(Appearance),
  },
]

export const schemas: RouteSchema[] = [
  {
    path: "/",
    element: React.createElement(Dashboard),
    children: [
      {
        path: "",
        label: "首页",
        element: React.createElement(Home),
      },
      ...userSettingsSchemas,
    ],
  },
]
