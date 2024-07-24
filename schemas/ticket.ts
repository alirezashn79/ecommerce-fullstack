import { Types } from "mongoose";
import { z } from "zod";

export const zTicketSchema = z.object({
  title: z.string().trim().min(4),
  department: z.string().refine((value) => Types.ObjectId.isValid(value)),
  subDepartment: z.string().refine((value) => Types.ObjectId.isValid(value)),
  priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  body: z.string().trim().min(6),
});
