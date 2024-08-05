import { appRouter } from '../trpc/router'

import { defineNitroTRPCEventHandler } from 'trpc-nitro-adapter'

export default defineNitroTRPCEventHandler({
  router: appRouter,
  createContext: () => {
    // Return your custom defined context here:
    return {}
  }
})