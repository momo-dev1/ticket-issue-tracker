'use client'
import { TicketSchema } from '@/schema'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { customFetch } from '@/utils/axiosInstance'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type TicketFormData = z.infer<typeof TicketSchema>

interface IProps {
  ticket?: TicketFormData
}
const TicketForm = ({ ticket }: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<TicketFormData>({
    resolver: zodResolver(TicketSchema),
  })

  const onSubmit = async (data: z.infer<typeof TicketSchema>) => {
    try {
      setIsSubmitting(true)
      setError('')
      if (ticket) {
        await customFetch.patch(`/tickets/${ticket.id}`, data)
      } else {
        await customFetch.post('/tickets', data)
      }

      setIsSubmitting(false)
      router.push('/')
      router.refresh()
    } catch (e) {
      setError('Something went wrong')
      setIsSubmitting(false)
    }
  }

  return (
    <section className=' mx-3 max-w-screen-xl rounded-md border p-10 md:mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Example asdasd'
                    defaultValue={ticket?.title}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            name='description'
            defaultValue={ticket?.description}
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder='Description' {...field} />
            )}
          />

          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='status'
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='OPEN'>OPEN</SelectItem>
                      <SelectItem value='STARTED'>STARTED</SelectItem>
                      <SelectItem value='CLOSED'>CLOSED</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a priority level' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='LOW'>LOW</SelectItem>
                      <SelectItem value='MEDIUM'>MEDIUM</SelectItem>
                      <SelectItem value='HIGH'>HIGH</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {ticket ? 'Update ticket' : 'Create ticket'}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default TicketForm
