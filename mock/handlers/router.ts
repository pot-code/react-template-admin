import { rest } from "msw"

export const handlers = [
  rest.get("/api/routes", (_, res, ctx) =>
    res(
      ctx.delay(500),
      ctx.json([
        {
          path: "menu1",
          label: "菜单1",
          children: [
            {
              path: "sub1",
              viewPath: "/menu1/sub1.tsx",
              label: "子菜单1",
            },
            {
              path: "sub2",
              label: "子菜单2",
              viewPath: "/menu1/sub2.tsx",
            },
          ],
        },
        {
          path: "menu2",
          label: "菜单2",
          viewPath: "/menu2.tsx",
        },
      ]),
    ),
  ),
]
