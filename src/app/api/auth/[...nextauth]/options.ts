import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prismadb'
import bcrypt from 'bcryptjs'

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        })
        if (!user) {
          return null
        }

        const match = await bcrypt.compare(credentials!.password, user.password)

        if (match) {
          return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'USER'
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
}

export default options
