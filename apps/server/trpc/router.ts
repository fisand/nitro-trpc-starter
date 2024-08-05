import { initTRPC } from '@trpc/server'
import { z } from 'zod'

import { db } from '../db'

export const t = initTRPC.create()

export const appRouter = t.router({
  userList: t.procedure.query(() => {
    const users = db.user.findMany()
    return users
  }),
  userById: t.procedure.input(z.string()).query((opts) => {
    const { input } = opts
    const user = db.user.findById(input)
    return user
  }),
  userCreate: t.procedure.input(z.object({ name: z.string().min(1) })).mutation((opts) => {
    const { input } = opts
    const user = db.user.create(input)

    return user
  }),
})

export type AppRouter = typeof appRouter
