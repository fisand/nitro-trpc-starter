import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'

import { trpc } from '../trpc'

function HomePage() {
  const userList = trpc.userList.useQuery()
  const createUser = trpc.userCreate.useMutation()
  const deleteUser = trpc.userDelete.useMutation()

  const [name, setName] = useState('')

  return (
    <div className="h-screen w-screen flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-14 border-b border-b-1 border-border"
      >
        <div className="mx-auto h-full flex items-center justify-between container lt-sm:px-4">
          <span className="flex items-center gap-1.5 text-lg font-500">
            <span className="i-devicon-plain:trpc h-5.5 w-5.5" />
            Nitro + tRPC
          </span>

          <a
            rel="noreferrer noopener"
            href="https://github.com/fisand/nitro-trpc-starter"
            target="_blank"
            className="flex-col-center"
          >
            <span className="i-simple-icons:github h-5.5 w-5.5 cursor-pointer transition-all hover:scale-105" />
          </a>
        </div>
      </motion.div>
      <div className="mx-auto w-100 flex-1 lt-sm:(w-full px-4)">
        <div className="flex items-center gap-3 pb-5 pt-10">
          <AnimatePresence>
            {userList.data?.map((user, index) => (
              <motion.span
                key={user.id}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
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
                <Button className="group relative">
                  <span
                    className="pointer-events-none absolute right--1.5 top--1.5 flex-col-center rounded-full bg-primary op-0 group-hover:(pointer-events-auto op-100)"
                    onClick={async (e) => {
                      e.stopPropagation()
                      await deleteUser.mutateAsync(user.id)
                      await userList.refetch()
                    }}
                  >
                    <span className="i-lucide:x h-3.5 w-3.5 text-primary-foreground" />
                  </span>
                  {user.name}
                </Button>
              </motion.span>
            ))}
          </AnimatePresence>
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
                <span className="i-lucide:plus mr-1 h-4 w-4 text-primary-foreground" />
              )}
              New
            </Button>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 h-14 border-t border-t-1 border-border"
      >
        <span />
        <div className="mx-auto h-full flex-center gap-2 lt-sm:px-4">
          <a href="https://nitro.unjs.io/" target="_blank" rel="noreferrer noopener">
            <img src="https://nitro.unjs.io/icon.svg" alt="nitro" title="nitro" className="h-5 w-5" />
          </a>
          <a href="https://trpc.io/" target="_blank" rel="noreferrer noopener" className="flex-col-center">
            <span className="i-devicon-plain:trpc h-5 w-5" />
          </a>
        </div>
        <span />
      </motion.div>
    </div>
  )
}

export default HomePage
