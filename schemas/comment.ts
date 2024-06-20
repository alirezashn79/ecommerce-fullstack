import { Types } from "mongoose";
import { z } from "zod";

export const zCommentSchema = z.object({
  username: z.string().trim().min(4),
  email: z.string().email().trim().min(6),
  body: z.string().trim().min(6),
  score: z.number().positive(),
  date: z.date().readonly().optional(),
  productID: z.string().refine((value) => {
    return Types.ObjectId.isValid(value);
  }),
});
