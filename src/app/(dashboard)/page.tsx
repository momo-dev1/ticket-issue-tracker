import React from 'react'
import DashRecentTickets from '@/components/DashRecentTickets'
import DashChart from '@/components/DashChart'
import prisma from '@/lib/prismadb'

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: 'CLOSED' }],
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  })

  const groupTicket = await prisma.ticket.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })

  const data = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    }
  })

  return (
    <div>
      <div className='grid gap-4 px-2 md:grid-cols-2'>
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
