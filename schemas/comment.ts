import { Types } from "mongoose";
import { z } from "zod";

export const zCommentSchema = z.object({
  username: z.string().trim().min(4),
  email: z.string().email().trim().min(6),
  body: z.string().trim().min(6),
  score: z.number().nonnegative(),
  date: z.date().readonly().optional(),
  isAccepted: z.boolean().default(false).optional(),
  product: z.string().refine((value) => {
    return Types.ObjectId.isValid(value);
  }),
});
