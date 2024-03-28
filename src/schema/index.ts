import { z } from 'zod'

export const TicketSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(8, { message: 'Title is too short' })
    .max(60, { message: 'Title is too long' }),
  description: z
    .string()
    .min(8, { message: 'Title is too short' })
    .max(255, { message: 'Description is too long' }),
  status: z.enum(['OPEN', 'STARTED', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(4, { message: 'Name is required' })
    .max(55, { message: 'Name is too long' }),
  username: z
    .string()
    .min(6, { message: 'Username is required' })
    .max(30, { message: 'Username is too long' }),
  password: z
    .string()
    .min(6, { message: 'Password is required' })
    .max(40, { message: 'Password is too long' })
    .optional()
    .or(z.literal('')),
  role: z.enum(['TECH', 'ADMIN', 'USER']).default('USER'),
})
