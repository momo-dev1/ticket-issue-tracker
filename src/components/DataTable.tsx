import { Ticket } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import PariorityFlames from './PariorityFlames';

interface IProps {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: IProps) => {
  return (
    <Table className='mx-auto mt-20 max-w-screen-xl gap-8 rounded-md border px-4 sm:px-6 lg:px-8'>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className='pr-20 text-right'>CreatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets
          ? tickets.map(({ id, title, status, priority, createdAt }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{title}</TableCell>
                <TableCell>
                  <StatusBadge status={status} />
                </TableCell>
                <TableCell>
                  <PariorityFlames pariority={priority} />
                </TableCell>
                <TableCell className='pr-10 text-right'>
                  {createdAt?.toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>0</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};
export default DataTable;
