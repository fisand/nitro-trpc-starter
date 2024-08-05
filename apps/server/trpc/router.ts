import { initTRPC } from '@trpc/server'
import { z } from 'zod';
import { db } from '../db';

export const t = initTRPC.create()

export const appRouter = t.router({
  userList: t.procedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
  userById: t.procedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);
    return user;
  }),
  userCreate: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async (opts) => {
      const { input } = opts;    
      const user = await db.user.create(input);
   
      return user;
    }),
})

export type AppRouter = typeof appRouter