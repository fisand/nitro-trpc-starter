import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App.tsx'
import { trpc } from './trpc/index.ts'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './index.css'

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api',
      // You can pass any HTTP headers you wish here
      headers() {
        return {
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      },
    }),
  ],
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </trpc.Provider>,
)
