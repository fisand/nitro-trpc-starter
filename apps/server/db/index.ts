type User = { id: string; name: string }

// Imaginary database
const users: User[] = [
  { name: 'alice', id: '1' },
  { name: 'bob', id: '2' },
]
export const db = {
  user: {
    findMany: () => users,
    findById: (id: string) => users.find((user) => user.id === id),
    create: (data: { name: string }) => {
      const user = { id: String(users.length + 1), ...data }
      users.push(user)
      return user
    },
  },
}
