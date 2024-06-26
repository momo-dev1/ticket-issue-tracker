'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Status = {
  label: string
  value?: string
}
const statuses: Status[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
]

const StatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status) params.append('status', status)
        const query = params.size ? `?${params.toString()}` : '0'
        router.push('/tickets/' + query)
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Filter by status...' />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.label || '0'} value={status.value || '0'}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default StatusFilter
