import { type AnyTRPCRouter, TRPCError } from '@trpc/server'
import { incomingMessageToRequest, type IncomingMessageWithBody } from '@trpc/server/adapters/node-http'
import { resolveResponse } from '@trpc/server/http'
import { type EventHandlerRequest, type H3Event, isMethod, readBody, setHeader, setResponseStatus } from 'h3'
import { createURL } from 'ufo'

const getPath = (event: H3Event): string => {
  const params = event.context.params

  if (!params) {
    // Throw an error if the trpc parameter is not a string or an array:
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Please ensure that the trpc parameter is defined in your routes file e.g., ./routes/[trpc].ts',
      cause: 'Nitro Routing Configuration',
    })
  }

  if (typeof params.trpc === 'string') {
    return params.trpc
  }

  if (typeof params.trpc === 'string') {
    return params.trpc
  }

  // Throw an error if the trpc parameter is not a string or an array:
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Please ensure that the trpc parameter is defined in your routes file e.g., ./routes/[trpc].ts',
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
