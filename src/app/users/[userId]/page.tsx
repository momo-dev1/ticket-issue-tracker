import UserForm from '@/components/UserForm'
import prisma from '@/lib/prismadb'

interface IProps {
  params: { userId: string }
}

const EditUser = async ({ params: { userId } }: IProps) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) return <div>User not found</div>

  return (
    <div>
      <UserForm user={user} />
    </div>
  )
}

export default EditUser
