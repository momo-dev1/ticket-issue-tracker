import { Ticket } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface IProps {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: IProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>CreatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets
          ? tickets.map(({ id, title, status, priority, createdAt }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{title}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{priority}</TableCell>
                <TableCell>
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
