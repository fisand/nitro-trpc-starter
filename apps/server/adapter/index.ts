import { type AnyTRPCRouter, TRPCError } from '@trpc/server'
import { incomingMessageToRequest, type IncomingMessageWithBody } from '@trpc/server/adapters/node-http'
import { resolveResponse } from '@trpc/server/http'
import { type EventHandlerRequest, type H3Event, readBody, setHeader, setResponseStatus } from 'h3'

const getPath = (event: H3Event): string => {
  const { params } = event.context

  if (typeof params?.trpc === 'string') {
    return params.trpc
  }

  if (params?.trpc && Array.isArray(params.trpc)) {
    return (params.trpc as string[]).join('/')
  }

  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
    cause: 'Nitro Routing Configuration',
  })
}

export const createNitroAdapter = (options: {
  router: AnyTRPCRouter
  createContext?: (event: H3Event<EventHandlerRequest>) => Promise<any>
  onError?: (...args: any[]) => void
}) => {
  return defineEventHandler(async (event) => {
    const path = getPath(event)
    const incomingMessage = event.node.req as IncomingMessageWithBody

    if ('body' in incomingMessage) {
      incomingMessage.body = await readBody(event)
    }

    const { status, headers, body } = await resolveResponse({
      ...options,
      req: incomingMessageToRequest(event.node.req, {
        maxBodySize: null,
      }),
      path,
      error: null,
      createContext: () => options.createContext?.(event),
      onError(o) {
        options?.onError?.({ ...o, event })
      },
      responseMeta: undefined,
    })

    setResponseStatus(event, status)

    headers &&
      Object.keys(headers).forEach((key) => {
        if (headers[key]) {
          setHeader(event, key, headers[key]!)
        }
      })

    return body
  })
}
