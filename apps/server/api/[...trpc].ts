import { createNitroAdapter } from '~/adapter'

import { appRouter } from '../trpc/router'

export default createNitroAdapter({
  router: appRouter,
})
