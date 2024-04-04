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
import { useRouter } from 'next/navigation'

type LoginInput = {
  username: string
  password: string
}

const LogIn = () => {
  const [inputs, setInputs] = useState<LoginInput>({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const url = await signIn('credentials', {
        username: inputs.username,
        password: inputs.password,
        redirect: false,
      })
      if (url?.ok) {
        router.replace('/')
        router.refresh()
      }
      if (url?.error) {
        setError('Username or Password is incorrect')
      }
    } catch (error) {
      setError('Unknown Error Occured.')
    }
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
          {error && (
            <p className='text-center capitalize text-red-600'>{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
export default LogIn
