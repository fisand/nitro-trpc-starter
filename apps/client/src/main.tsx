import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';


import App from './App.tsx'
import './index.css'
import { trpc } from './trpc/index.ts';



const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        };
      },
    }),
  ],
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>,
)
