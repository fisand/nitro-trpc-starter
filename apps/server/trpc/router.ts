import { PrismaClient } from '@prisma/client'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const prisma = new PrismaClient()

export const t = initTRPC.create()

export const appRouter = t.router({
  userList: t.procedure.query(async () => {
    const users = await prisma.user.findMany()
    return users
  }),
  userByName: t.procedure.input(z.string()).query(async (opts) => {
    const { input } = opts
    const user = await prisma.user.findFirst({
      where: {
        name: input,
      },
    })
    return user
  }),
  userCreate: t.procedure.input(z.object({ name: z.string().min(1) })).mutation(async (opts) => {
    const { input } = opts

    const user = await prisma.user.create({
      data: {
        name: input.name,
      },
    })

    return user
  }),
})

export type AppRouter = typeof appRouter
