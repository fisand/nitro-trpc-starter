import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '../../../server/trpc/router'

const trpc = createTRPCReact<AppRouter>()

export { trpc }

export { type AppRouter } from '../../../server/trpc/router'
