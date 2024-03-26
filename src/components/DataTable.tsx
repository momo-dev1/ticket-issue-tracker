import { Ticket } from '@prisma/client'
import { ISearchParamsProps } from '@/app/page'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import StatusBadge from './StatusBadge'
import PariorityFlames from './PariorityFlames'
import Link from 'next/link'
import TableHead from './TableHead'

interface IProps {
  tickets: Ticket[]
  searchParams: ISearchParamsProps
}

const DataTable = ({ tickets, searchParams }: IProps) => {
  return (
    <Table className='mx-auto mt-6  max-w-screen-xl gap-8 rounded-md border px-4 sm:px-6 md:mx-auto lg:px-8'>
      <TableHeader>
        <TableRow>
          <TableHead searchParams={searchParams} name='Title' orderBy='title' />
          <TableHead
            searchParams={searchParams}
            name='Status'
            orderBy='status'
          />
          <TableHead
            searchParams={searchParams}
            name='Priority'
            orderBy='priority'
          />
          <TableHead
            searchParams={searchParams}
            name='CreatedAt'
            orderBy='createdAt'
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets
          ? tickets.map(({ id, title, status, priority, createdAt }) => (
              <TableRow key={id}>
                <TableCell className=' font-medium'>
                  <Link href={`/tickets/details/${id}`}>{title}</Link>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center '>
                    <StatusBadge status={status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <PariorityFlames pariority={priority} />
                  </div>
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
    </Table>
  )
}
export default DataTable
