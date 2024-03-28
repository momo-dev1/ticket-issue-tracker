import prisma from '@/lib/prismadb'
import { UserSchema } from '@/schema'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

type PropsType = {
  params: { userId: string }
}

export async function PATCH(
  req: NextRequest,
  { params: { userId } }: PropsType,
) {
  const body = await req.json()
  const validation = UserSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (body?.password) {
    const hashedPassword = await bcrypt.hash(body.password, 10)
    body.password = hashedPassword
  }

  if (body.username !== user.username) {
    const isUsernameTaken = await prisma.user.findUnique({
      where: { username: body.username },
    })
    if (isUsernameTaken) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 },
      )
    }
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { ...body },
  })
  return NextResponse.json(updatedUser, { status: 200 })
}
