import { Priority } from '@prisma/client';
import { Flame } from 'lucide-react';

interface IProps {
  pariority: Priority;
}

const PariorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  LOW: { label: 'Low', level: 1 },
  MEDIUM: { label: 'Medium', level: 2 },
  HIGH: { label: 'High', level: 3 },
};

const PariorityFlames = ({ pariority }: IProps) => {
  return (
    <div className='flex justify-center'>
      <Flame
        className={`${PariorityMap[pariority].level >= 1 ? 'text-red-500' : 'text-muted'} `}
      />
      <Flame
        className={`${PariorityMap[pariority].level >= 2 ? 'text-red-500' : 'text-muted'} `}
      />
      <Flame
        className={`${PariorityMap[pariority].level >= 3 ? 'text-red-500' : 'text-muted'} `}
      />
    </div>
  );
};

export default PariorityFlames;
