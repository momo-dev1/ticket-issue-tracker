import DataTable from '@/components/DataTable';
import prisma from '@/lib/prismadb';

const Ticket = async () => {
  const tickets = await prisma.ticket.findMany({orderBy: [{createdAt: 'desc'}]});
  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Ticket;
