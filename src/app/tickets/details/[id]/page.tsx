import prisma from '@/lib/prismadb'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import PariorityFlames from '@/components/PariorityFlames'
import { Button, buttonVariants } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'

interface IProps {
  params: {
    id: string
  }
}
const TicketDetails = async ({ params: { id } }: IProps) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  })
  if (!ticket) return <div>No Ticket Found</div>
  return (
    <Card>
      <CardHeader>
        <div className='mb-3 flex justify-between'>
          <StatusBadge status={ticket.status} />
          <PariorityFlames pariority={ticket.priority} />
        </div>
        <CardTitle>{ticket.title}</CardTitle>
        <CardDescription>
          <p>
            Created:{' '}
            {ticket.createdAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{ticket.description}</p>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-center justify-between'>
          <p>
            Updated:{' '}
            {ticket.updatedAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
          <Button className='bg-gradient-to-r from-cyan-500 to-teal-500 transition hover:scale-105 hover:opacity-70'>
            <Link href={`/tickets/edit/${id}`}>Edit ticket</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TicketDetails
