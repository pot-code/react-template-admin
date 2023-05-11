import { rest } from "msw"

export const handlers = [
  rest.get("/api/user/info", (_, res, ctx) =>
    res(
      ctx.delay(500),
      ctx.json({
        username: "demo",
        avatar: "https://avatars.githubusercontent.com/u/17687881?s=48&v=4",
      }),
    ),
  ),
]
