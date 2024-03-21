import DataTable from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prismadb'
import Link from 'next/link'

const Ticket = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: [{ createdAt: 'desc' }],
  })
  return (
    <>
      <Button className='bg-gradient-to-r from-cyan-500 to-teal-500'>
        <Link href='/tickets/new'>Create ticket</Link>
      </Button>
      <DataTable tickets={tickets} />
    </>
  )
}

export default Ticket
