import React from "react"
import Dashboard from "@/layout/Dashboard"
import Home from "@/views/home"
import { RouteSchema } from "./type"

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
    ],
  },
]
