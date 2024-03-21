import prisma from '@/lib/prismadb'

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
  return <>{ticket.title}</>
}

export default TicketDetails
