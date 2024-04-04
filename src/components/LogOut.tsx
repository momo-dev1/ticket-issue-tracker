'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const LogOut = () => {
  return (
    <Button
      className='hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block'
      onClick={() => signOut()}
    >
      Logout
    </Button>
  )
}

export default LogOut
