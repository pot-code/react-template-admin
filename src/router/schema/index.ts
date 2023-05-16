import React from "react"
import Dashboard from "@/layout/Dashboard"
import Home from "@/views/home"
import Appearance from "@/views/settings/appearance"
import Info from "@/views/settings/info"
import { RouteSchema } from "./type"
import { Menu } from "@/views/system/menu"

export const DASHBOARD_ID = "dashboard"
export const SETTINGS_ID = "settings"

export const settingSchemas: RouteSchema[] = [
  {
    id: SETTINGS_ID,
    parentId: DASHBOARD_ID,
    path: SETTINGS_ID,
    label: "设置",
    hiddenInMenu: true,
    order: 2,
  },
  {
    id: "user-center",
    parentId: SETTINGS_ID,
    path: "user-center",
    label: "个人中心",
    order: 1,
    element: React.createElement(Info),
  },
  {
    id: "appearance",
    parentId: SETTINGS_ID,
    path: "appearance",
    label: "外观设置",
    order: 2,
    element: React.createElement(Appearance),
  },
]

const schemas: RouteSchema[] = [
  {
    id: DASHBOARD_ID,
    path: "/",
    element: React.createElement(Dashboard),
    order: 1,
  },
  {
    id: "home",
    parentId: DASHBOARD_ID,
    path: "",
    label: "首页",
    order: 1,
    element: React.createElement(Home),
  },
  {
    id: "system",
    parentId: DASHBOARD_ID,
    path: "system",
    label: "系统设置",
    order: 999,
  },
  {
    id: "menu",
    parentId: "system",
    path: "menu",
    label: "菜单管理",
    order: 1,
    element: React.createElement(Menu),
  },
  ...settingSchemas,
]

export default schemas
