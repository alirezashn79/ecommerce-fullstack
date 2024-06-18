import { z } from "zod";

export const zCommentSchema = z.object({
  username: z.string().trim().min(6),
  email: z.string().email().trim().min(6),
  body: z.string().trim().min(10),
  score: z.number().positive(),
  date: z.date(),
});
