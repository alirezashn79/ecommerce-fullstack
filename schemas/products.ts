import { z } from "zod";

export const ZProductSchema = z.object({
  name: z.string().trim().min(6),
  price: z.number().positive(),
  shortDescription: z.string().trim().min(10),
  longDescription: z.string().trim().min(15),
  weight: z.number().positive(),
  suitableFor: z.string().trim().min(4),
  smell: z.string().trim().min(4),
  score: z.number().positive().optional(),
  tags: z.array(z.string().trim().min(4)),
});
