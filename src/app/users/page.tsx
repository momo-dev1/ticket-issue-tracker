import UserForm from '@/components/UserForm'
import UserTable from '@/components/UserTable'
import prisma from '@/lib/prismadb'

const Users = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      password: false,
    },
  })

  return (
    <div>
      <UserForm />
      <UserTable users={users} />
    </div>
  )
}

export default Users
