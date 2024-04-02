'use client'
import { signIn } from 'next-auth/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type LoginInput = {
  username: string
  password: string
}

type IProps = {
  searchParams: { error?: string }
}

const LogIn = ({ searchParams }: IProps) => {
  const [inputs, setInputs] = useState<LoginInput>({
    username: '',
    password: '',
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await signIn('credentials', {
      username: inputs.username,
      password: inputs.password,
      redirect: false,
      callbackUrl: '/',
    })
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor='email'>Username</Label>
            <Input
              id='username'
              name='username'
              placeholder='YacineMansour88'
              required
              type='username'
              value={inputs.username}
              onChange={handleChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              required
              type='password'
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <Button className='w-full' type='submit'>
            Login
          </Button>
          {searchParams.error && (
            <p className='text-center capitalize text-red-600'>Login failed.</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
export default LogIn
