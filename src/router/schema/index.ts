import React from "react"
import Dashboard from "@/layout/Dashboard"
import Home from "@/views/home"
import Appearance from "@/views/settings/appearance"
import Info from "@/views/settings/info"
import { RouteSchema } from "./type"
import { Menu } from "@/views/system/menu"

export const settingSchema: RouteSchema = {
  path: "settings",
  label: "设置",
  hiddenInMenu: true,
  order: 2,
  children: [
    {
      path: "user-center",
      label: "个人中心",
      order: 1,
      element: React.createElement(Info),
    },
    {
      path: "appearance",
      label: "外观设置",
      order: 2,
      element: React.createElement(Appearance),
    },
  ],
}

export const systemSchema: RouteSchema = {
  path: "system",
  label: "系统设置",
  order: 999,
  children: [
    {
      path: "menu",
      label: "菜单管理",
      order: 1,
      element: React.createElement(Menu),
    },
  ],
}

export const menuSchema: RouteSchema = {
  path: "/",
  element: React.createElement(Dashboard),
  order: 1,
  children: [
    {
      path: "",
      label: "首页",
      order: 1,
      element: React.createElement(Home),
    },
    settingSchema,
    systemSchema,
  ],
}
