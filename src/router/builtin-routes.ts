import React from "react"
import { RouteSchema } from "@/features/system/menu/types"
import UserInfo from "@/views/settings/user-info"
import Appearance from "@/views/settings/appearance"

export const SETTINGS_ID = "settings"

export const settings: RouteSchema[] = [
  {
    id: SETTINGS_ID,
    path: "settings",
    label: "设置",
    order: 1,
    locked: true,
    hiddenInMenu: true,
  },
  {
    parentId: SETTINGS_ID,
    path: "user-center",
    label: "个人中心",
    order: 1,
    locked: true,
    element: React.createElement(UserInfo),
  },
  {
    parentId: SETTINGS_ID,
    path: "appearance",
    label: "外观设置",
    order: 2,
    locked: true,
    element: React.createElement(Appearance),
  },
]
