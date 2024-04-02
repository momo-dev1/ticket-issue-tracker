import options from '@/app/api/auth/[...nextauth]/options';
import UserForm from '@/components/UserForm'
import prisma from '@/lib/prismadb'
import { getServerSession } from 'next-auth';

interface IProps {
  params: { userId: string }
}

const EditUser = async ({ params: { userId } }: IProps) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required.</p>;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) return <div>User not found</div>

  return (
    <div>
      <UserForm user={user} />
    </div>
  )
}

export default EditUser
