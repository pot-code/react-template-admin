import { rest } from "msw"

export const handlers = [rest.get("/mock/hello", (_, res, ctx) => res(ctx.delay(500), ctx.text("hello")))]
