import prisma from '@/lib/prismadb'
import dynamic from 'next/dynamic'

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
})

interface IProps {
  params: {
    id: string
  }
}
const UpdateTicket = async ({ params: { id } }: IProps) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  })
  if (!ticket) return <div>No Ticket Found</div>
  return (
    <>
      <TicketForm ticket={ticket} />
    </>
  )
}

export default UpdateTicket
