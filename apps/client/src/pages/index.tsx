import { useState } from 'react'

import reactLogo from '../assets/react.svg'
import { trpc } from '../trpc'

const HomePage = () => {
  const [count, setCount] = useState(0)
  const userList = trpc.userList.useQuery()

  return (
    <div className="h-screen w-screen flex-col-center gap-5">
      <div className="flex-center gap-5 [&_img]:w-30">
        <a rel="noreferrer noopener" href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo hover:[filter:drop-shadow(0_0_2em_#646cffaa)]" alt="Vite logo" />
        </a>
        <a rel="noreferrer noopener" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo hover:[filter:drop-shadow(0_0_2em_#61dafbaa)]" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card flex-col-center">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <div className="flex-center gap-2">
        {userList.data?.map((user) => (
          <button
            type="button"
            key={user.id}
            className="rounded bg-blue-400 px-3 py-1.5 text-white shadow shadow-blue-200 active:translate-y-.15 hover:bg-blue-600"
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HomePage
