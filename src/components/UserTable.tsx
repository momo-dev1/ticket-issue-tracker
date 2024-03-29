import { User } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

type UserWithoutPassword = Omit<User, 'password'>

interface IProps {
  users: UserWithoutPassword[]
}

const UserTable = ({ users }: IProps) => {
  return (
    <Table className='mx-auto mt-6  max-w-screen-xl gap-8 rounded-md border px-4 sm:px-6 md:mx-auto lg:px-8'>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>UserName</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users
          ? users.map(({ id, name, username, role }) => (
              <TableRow key={id}>
                <TableCell className=' font-medium'>
                  <Link href={`/users/${id}`}>{name}</Link>
                </TableCell>
                <TableCell className=' font-medium'>
                  <Link href={`/users/${id}`}>{username}</Link>
                </TableCell>
                <TableCell className=' font-medium'>
                  <Link href={`/users/${id}`}>{role}</Link>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  )
}
export default UserTable
