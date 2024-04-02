import options from '@/app/api/auth/[...nextauth]/options'
import UserForm from '@/components/UserForm'
import UserTable from '@/components/UserTable'
import prisma from '@/lib/prismadb'
import { getServerSession } from 'next-auth'

const Users = async () => {
  const session = await getServerSession(options)

  if (session?.user.role !== 'ADMIN') {
    return <p className='text-destructive'>Admin access required.</p>
  }

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
