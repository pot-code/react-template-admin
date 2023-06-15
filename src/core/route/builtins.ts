import React from "react"
import UserInfo from "@/views/settings/user-info"
import Appearance from "@/views/settings/appearance"
import Dashboard from "@/layout/dashboard"
import Home from "@/views/home"
import { RouteSchema } from "./types"

export const SETTINGS_ID = "settings"
export const DASHBOARD_ID = "dashboard"

export const settings: RouteSchema[] = [
  {
    id: SETTINGS_ID,
    parentId: DASHBOARD_ID,
    path: "settings",
    label: "设置",
    order: 1,
    locked: true,
    hiddenInMenu: true,
  },
  {
    parentId: SETTINGS_ID,
    id: "user-center",
    path: "user-center",
    label: "个人中心",
    order: 1,
    locked: true,
    element: React.createElement(UserInfo),
  },
  {
    parentId: SETTINGS_ID,
    id: "appearance",
    path: "appearance",
    label: "外观设置",
    order: 2,
    locked: true,
    element: React.createElement(Appearance),
  },
]

export const dashboard: RouteSchema[] = [
  {
    id: DASHBOARD_ID,
    path: "/",
    label: "根菜单",
    order: 1,
    locked: true,
    element: React.createElement(Dashboard),
  },
  {
    parentId: DASHBOARD_ID,
    id: "home",
    path: "",
    label: "首页",
    order: -1,
    locked: true,
    element: React.createElement(Home),
  },
  ...settings,
]
