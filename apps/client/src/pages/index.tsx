import { motion } from 'framer-motion'
import { toast } from 'sonner'

import { trpc } from '../trpc'

const HomePage = () => {
  const userList = trpc.userList.useQuery()
  const createUser = trpc.userCreate.useMutation()

  const [name, setName] = useState('')

  return (
    <div className="h-screen w-screen gap-5">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-14 border-b border-b-1 border-border"
      >
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
      </motion.div>
      <div className="mx-auto w-100 lt-sm:px-4">
        <div className="flex items-center gap-2 pb-5 pt-10">
          {userList.data?.map((user, index) => (
            <motion.span
              key={user.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={{
                visible: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: (i + 0.05) * 0.05,
                  },
                }),
                hidden: { opacity: 0, y: 10 },
              }}
            >
              <Button>{user.name}</Button>
            </motion.span>
          ))}
        </div>
        {!userList.isPending && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Input
              type="text"
              maxLength={5}
              value={name}
              onInput={(e) => {
                setName((e.target as HTMLInputElement).value)
              }}
              placeholder="Name"
              className="w-40"
            />
            <Button
              onClick={async () => {
                if (!name) {
                  toast.error('Name is required')
                  return
                }
                if (userList.data && userList.data?.length >= 6) {
                  toast.error('You have reached the maximum number of users')
                  return
                }

                await createUser.mutateAsync({ name })
                setName('')
                await userList.refetch()
              }}
              disabled={userList.isPending || !userList.data || createUser.isPending}
            >
              {createUser.isPending ? (
                <span className="i-lucide:loader-circle mr-1 h-4 w-4 animate-spin" />
              ) : (
                <span className="i-lucide:plus mr-1 h-4 w-4 text-primary-foreground"></span>
              )}
              New
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default HomePage
