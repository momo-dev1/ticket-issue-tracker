import DataTable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prismadb'
import Link from 'next/link'

interface IProps {
  page: string
}
const Ticket = async ({ searchParams }: { searchParams: IProps }) => {
  const pageSize = 5
  const page = parseInt(searchParams.page) || 1
  const ticketCount = await prisma.ticket.count()

  const tickets = await prisma.ticket.findMany({
    orderBy: [{ createdAt: 'desc' }],
    take: pageSize,
    skip: (page - 1) * pageSize,
  })
  return (
    <>
      <Button className='bg-gradient-to-r from-cyan-500 to-teal-500'>
        <Link href='/tickets/new'>Create ticket</Link>
      </Button>
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
