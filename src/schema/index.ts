import { z } from "zod";

export const TicketSchema = z
    .object({
        title: z.string().min(8, { message: "Title is too short" })
            .max(60, { message: "Title is too long" }),
        description: z.string().min(8, { message: "Title is too short" })
            .max(255, { message: "Description is too long" }),
        status: z.enum(["OPEN", "STARTED", "CLOSED"]).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    })

