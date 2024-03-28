'use client'
import { UserSchema } from '@/schema'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

type UserFormData = z.infer<typeof UserSchema>

interface IProps {
  user?: UserFormData
}
const TicketForm = ({ user }: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    try {
      setIsSubmitting(true)
      setError('')
      if (user) {
        await customFetch.patch(`/users/${user.id}`, data)
      } else {
        await customFetch.post('/users', data)
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Yacine Mansour'
                    defaultValue={user?.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='YacineMansour88'
                    defaultValue={user?.username}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    defaultValue=''
                    required={user ? false : true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='role'
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a user role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='ADMIN'>ADMIN</SelectItem>
                      <SelectItem value='TECH'>TECH</SelectItem>
                      <SelectItem value='USER'>USER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {user ? 'Update user' : 'Create user'}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default TicketForm
