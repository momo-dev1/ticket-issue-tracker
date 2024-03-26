import DataTable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import StatusFilter from '@/components/StatusFilter'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prismadb'
import { Status } from '@prisma/client'
import Link from 'next/link'

interface IProps {
  status: Status
  page: string
}
const Ticket = async ({ searchParams }: { searchParams: IProps }) => {
  const pageSize = 5
  const page = parseInt(searchParams.page) || 1
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  let where = {}
  if (status) {
    where = { status }
  } else {
    where = {
      NOT: [{ status: 'CLOSED' }],
    }
  }

  const ticketCount = await prisma.ticket.count({ where })

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    take: pageSize,
    skip: (page - 1) * pageSize,
  })
  return (
    <>
      <div className='flex justify-between'>
        <Button className='bg-gradient-to-r from-cyan-500 to-teal-500'>
          <Link href='/tickets/new'>Create ticket</Link>
        </Button>
        <StatusFilter />
      </div>

      <DataTable tickets={tickets} />
      <Pagination
        ticketCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  )
}

export default Ticket
