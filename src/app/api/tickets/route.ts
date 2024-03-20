import prisma from '@/lib/prismadb'
import { TicketSchema } from '@/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validation = TicketSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const newTicket = await prisma.ticket.create({ data: { ...body } })

  return NextResponse.json(newTicket, { status: 201 })
}
