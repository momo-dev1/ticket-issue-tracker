import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import React from 'react'
import { Prisma } from '@prisma/client'
import StatusBadge from './StatusBadge'
import Link from 'next/link'
import PariorityFlames from './PariorityFlames'

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true }
}>

interface Props {
  tickets: TicketWithUser[]
}

const DashRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {tickets
            ? tickets.map((ticket) => (
                <div className='flex items-center' key={ticket.id}>
                  <StatusBadge status={ticket.status} />
                  <div className='ml-4 space-y-1'>
                    <Link href={`tickets/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.assignedToUser?.name || 'Unassigned'}</p>
                    </Link>
                  </div>
                  <div className='ml-auto font-medium'>
                    <PariorityFlames pariority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashRecentTickets
