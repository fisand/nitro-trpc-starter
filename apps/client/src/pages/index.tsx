import { toast } from 'sonner'

import { trpc } from '../trpc'

const HomePage = () => {
  const userList = trpc.userList.useQuery()
  const createUser = trpc.userCreate.useMutation()

  return (
    <div className="h-screen w-screen gap-5">
      <div className="h-14 border-b border-b-1 border-border">
        <div className="mx-auto h-full flex items-center justify-between container lt-sm:px-4">
          <span className="flex items-center gap-1.5 text-lg font-500">
            <span className="i-devicon-plain:trpc h-5.5 w-5.5"></span>
            Nitro + tRPC
          </span>

          <a
            rel="noreferrer noopener"
            href="https://github.com/fisand/nitro-trpc-starter"
            target="_blank"
            className="flex-col-center"
          >
            <span className="i-simple-icons:github h-5.5 w-5.5 cursor-pointer transition-all hover:scale-105"></span>
          </a>
        </div>
      </div>
      <div className="mx-auto container lt-sm:px-4">
        <div className="flex flex-center gap-2 py-5">
          {userList.data?.map((user) => <Button key={user.id}>{user.name}</Button>)}
          <Button
            onClick={async () => {
              if (userList.data && userList.data?.length >= 20) {
                toast.error('You have reached the maximum number of users')
                return
              }

              await createUser.mutateAsync({ name: `User ${(Math.random() * 100).toFixed(0)}` })
              await userList.refetch()
            }}
            disabled={userList.isPending || !userList.data}
          >
            <span className="i-lucide:plus h-4 w-4 text-primary-foreground"></span>
            New
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
