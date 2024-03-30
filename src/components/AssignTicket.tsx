'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { customFetch } from '@/utils/axiosInstance'
import { Ticket, User } from '@prisma/client'

type AssignUsers = Omit<User, 'password' | 'username' | 'role'>

interface IProps {
  ticket: Ticket
  users: AssignUsers[]
}
const AssignTicket = ({ ticket, users }: IProps) => {
  const assignTickets = async (userId: string) => {
    try {
      await customFetch.patch(`/tickets/${ticket.id}`, {
        assignedToUserId: userId === '0' ? null : userId,
      })
    } catch (error) {}
  }
  return (
    <div>
      <Select
        defaultValue={ticket?.assignedToUserId || '0'}
        onValueChange={assignTickets}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select User...' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'0'}>Unassigned</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id || '0'}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AssignTicket
