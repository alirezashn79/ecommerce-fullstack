import { number, object, string } from "zod";

export const zDiscountSchema = object({
  code: string().trim().min(4),
  percent: number().positive(),
  maxUse: number().positive(),
  uses: number().nonnegative().default(0),
});
