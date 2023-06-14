import React from "react"
import { RouteSchema } from "./types"
import UserInfo from "@/views/settings/user-info"
import Appearance from "@/views/settings/appearance"
import Dashboard from "@/layout/dashboard"
import Home from "@/views/home"
import { Menu } from "@/views/system/menu"

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
    order: 1,
    locked: true,
    element: React.createElement(Home),
  },
  {
    parentId: DASHBOARD_ID,
    id: "system",
    path: "system",
    label: "系统管理",
    order: 999,
    locked: true,
  },
  {
    parentId: "system",
    id: "menu",
    path: "menu",
    label: "菜单管理",
    order: 1,
    locked: true,
    element: React.createElement(Menu),
  },
  ...settings,
]
