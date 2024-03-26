'use client'
import { Button } from '@/components/ui/button'
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface IProps {
  ticketCount: number
  pageSize: number
  currentPage: number
}
const Pagination = ({ ticketCount, pageSize, currentPage }: IProps) => {
  const pageCount = Math.ceil(ticketCount / pageSize)
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    router.push('/?' + newParams.toString())
  }

  if (pageCount === 1) return null

  return (
    <div className='mt-4 inline-flex items-center justify-center gap-2 rounded py-1 dark:text-white'>
      {currentPage !== 1 && (
        <>
          <Button variant={'outline'} onClick={() => goToPage(1)}>
            <span className='sr-only'>Prev Page</span>
            <ChevronFirstIcon className='h-3 w-3' />
          </Button>

          <Button variant={'outline'} onClick={() => goToPage(currentPage - 1)}>
            <span className='sr-only'>Prev Page</span>
            <ChevronLeft className='h-3 w-3' />
          </Button>
        </>
      )}

      <span className='h-4 w-px bg-white/25' aria-hidden='true'></span>

      <div>
        <p>
          Page {currentPage} of {pageCount}
        </p>
      </div>

      <span className='h-4 w-px bg-white/25'></span>

      {currentPage !== pageCount && (
        <>
          <Button variant={'outline'} onClick={() => goToPage(currentPage + 1)}>
            <span className='sr-only'>Next Page</span>
            <ChevronRight className='h-3 w-3' />
          </Button>

          <Button variant={'outline'} onClick={() => goToPage(pageCount)}>
            <span className='sr-only'>Next Page</span>
            <ChevronLastIcon className='h-3 w-3' />
          </Button>
        </>
      )}
    </div>
  )
}

export default Pagination
