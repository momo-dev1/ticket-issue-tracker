import prisma from '@/lib/prismadb'
import { TicketSchema } from '@/schema'
import { NextRequest, NextResponse } from 'next/server'

type PropsType = { params: { id: string } }
export async function PATCH(req: NextRequest, { params: { id } }: PropsType) {
  const body = await req.json()
  const validation = TicketSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const ticket = await prisma.ticket.findUnique({ where: { id } })

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  })

  return NextResponse.json(updateTicket)
}
