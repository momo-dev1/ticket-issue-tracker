import { Status } from '@prisma/client';
import { Badge } from './ui/badge';

interface IProps {
  status: Status;
}

const StatusMap: Record<
  Status,
  { label: string; color: 'bg-red-500' | 'bg-blue-500' | 'bg-green-500' }
> = {
  OPEN: { label: 'open', color: 'bg-red-500' },
  STARTED: { label: 'started', color: 'bg-blue-500' },
  CLOSED: { label: 'closed', color: 'bg-green-500' },
};

const StatusBadge = ({ status }: IProps) => {
  return (
    <Badge
      className={`${StatusMap[status].color} hover:${StatusMap[status].color} text-background`}
    >
      {StatusMap[status].label}
    </Badge>
  );
};

export default StatusBadge;
