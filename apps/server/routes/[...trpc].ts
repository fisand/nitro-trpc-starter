import { defineNitroTRPCEventHandler } from 'trpc-nitro-adapter'

import { appRouter } from '../trpc/router'

export default defineNitroTRPCEventHandler({
  router: appRouter,
  createContext: () => {
    // Return your custom defined context here:
    return {}
  },
})
