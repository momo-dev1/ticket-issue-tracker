'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from './ui/button'
import { useState } from 'react'
import { customFetch } from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'

const DeleteButton = ({ ticketId }: { ticketId: string }) => {
  const [error, setError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const deleteTicket = async () => {
    try {
      setIsDeleting(true)
      await customFetch.delete(`/tickets/${ticketId}`)
      setIsDeleting(false)
      router.push('/tickets')
      router.refresh()
    } catch (error) {
      setError("Unexpected error. Couldn't delete ticket")
      setIsDeleting(false)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isDeleting}
        className={buttonVariants({
          variant: 'destructive',
          className: 'w-full',
        })}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            tickets.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={deleteTicket}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton
