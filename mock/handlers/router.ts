import { rest } from "msw"

export const handlers = [
  rest.get("/api/routes", (_, res, ctx) =>
    res(
      ctx.delay(500),
      ctx.json([
        {
          id: "7519e10b69390b90a45d243dc4500676cecbac03",
          path: "menu1",
          label: "菜单1",
          order: 3,
          locked: true,
          viewPath: null,
        },
        {
          id: "95ea8b637471c22168c26824a4be6e4c877fce59",
          parentId: "7519e10b69390b90a45d243dc4500676cecbac03",
          path: "sub1",
          label: "子菜单1",
          order: 1,
          viewPath: null,
        },
        {
          id: "fa5a357aa1b93924414262a8954bca42f05a05a4",
          parentId: "95ea8b637471c22168c26824a4be6e4c877fce59",
          path: "",
          label: "列表",
          order: 1,
          hiddenInMenu: true,
          viewPath: "/menu1/sub1.tsx",
        },
        {
          id: "c69effc08c5d77cc2180ba85c5112d554236675d",
          parentId: "95ea8b637471c22168c26824a4be6e4c877fce59",
          path: "edit",
          order: 2,
          label: "编辑",
          hiddenInMenu: true,
          viewPath: "/menu1/sub2.tsx",
        },
        {
          id: "a5e078d4fc35e7edf9025cb74c10e985245086e9",
          parentId: "7519e10b69390b90a45d243dc4500676cecbac03",
          order: 2,
          path: "sub2",
          label: "子菜单2",
          viewPath: "/menu1/sub2.tsx",
        },
        {
          id: "e70b5edc57c650560e1229122207060581a9c68c",
          path: "menu2",
          label: "菜单2",
          order: 4,
          viewPath: "/menu2.tsx",
        },
      ]),
    ),
  ),
  rest.delete("/api/routes/:routeId", (_, res, ctx) => res(ctx.delay(500))),
]
