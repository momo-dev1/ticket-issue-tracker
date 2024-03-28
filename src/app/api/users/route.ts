import prisma from '@/lib/prismadb'
import { UserSchema } from '@/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validation = UserSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const isUsernameTaken = await prisma.user.findUnique({
    where: { username: body.username },
  })
  if (isUsernameTaken) {
    return NextResponse.json(
      { error: 'Username already taken' },
      { status: 400 },
    )
  }
  const newUser = await prisma.user.create({ data: { ...body } })
  return NextResponse.json(newUser, { status: 201 })
}
