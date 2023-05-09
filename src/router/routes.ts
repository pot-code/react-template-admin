import React from "react"
import Dashboard from "@/layout/Dashboard"
import Home from "@/views/HomeView"
import { RouteItem } from "./type"

export const routes: RouteItem[] = [
  {
    path: "/",
    element: React.createElement(Dashboard),
    children: [
      {
        path: "",
        label: "首页",
        element: React.createElement(Home),
      },
    ],
  },
]
