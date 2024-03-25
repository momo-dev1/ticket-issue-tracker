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
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import Markdown from 'react-markdown'
import DeleteButton from '@/components/DeleteButton'

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
      <CardContent className='prose dark:prose-invert'>
        <Markdown>{ticket.description}</Markdown>
      </CardContent>
      <CardFooter>
        <div className='flex w-full flex-wrap items-center justify-between gap-3'>
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
          <div className='flex w-full items-center justify-center gap-3 md:w-auto'>
            <Button className='w-full bg-gradient-to-r from-cyan-500 to-teal-500 transition hover:scale-105 hover:opacity-70'>
              <Link href={`/tickets/edit/${id}`}>Edit ticket</Link>
            </Button>
            <DeleteButton ticketId={id} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TicketDetails
